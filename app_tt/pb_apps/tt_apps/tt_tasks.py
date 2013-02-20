# -*- coding: utf-8 -*-

from app_tt.pb_apps.pb_task import pb_task
import ttapps
from app_tt.core import app
from subprocess import call
import requests
import urllib2
from requests import RequestException
import json
import sys


"""
    Table transcriber tasks
    ~~~~~~~~~~~~~~~~~~~~~~
"""


class TTTask1(pb_task):
    def __init__(self, task_id, app_short_name):
        super(TTTask1, self).__init__(task_id, app_short_name)

    def add_next_task(self):
        #Verify the answer of the question to create a new task
        if(self.task.info["answer"] == "Yes"):
            info = dict(link=self.task.info["url_m"],
                        page=self.task.info["page"])
            tt2_app_short_name = self.app_short_name[:-1] + "2"
            tt2_app = ttapps.Apptt_meta(short_name=tt2_app_short_name)

            tt2_app.add_task(info)

    def close_task(self):
        pass

    def check_answer(self):
        task_runs = self.get_task_runs()
        N_ANSWER = 2
        answers = {}
        for taskrun in task_runs:
            answer = taskrun.info
            if(answer not in answers.keys()):
                answers[answer] = 1
            else:
                answers[answer] += 1

            if(answers[answer] == N_ANSWER and answer != "NotKnown"):
                self.task.info["answer"] = answer
                #put the answer into task info
                requests.put("%s/api/task/%s?api_key=%s" % (
                    app.config['PYBOSSA_URL'], self.task.id,
                    app.config['API_KEY']),
                    data=json.dumps(dict(info=self.task.info)))
                return True
        return False


class TTTask2(pb_task):
    def __init__(self, task_id, app_short_name):
        super(TTTask2, self).__init__(task_id, app_short_name)

    def add_next_task(self):
        #Get the list of task_runs
        task_runs = json.loads(urllib2.urlopen(
            "%s/api/taskrun?task_id=%s&limit=%d" % (
                app.config['PYBOSSA_URL'], self.task.id, sys.maxint)).read())

        task_run = task_runs[len(task_runs) - 1]  # Get the last answer
        answer = json.loads(task_run["info"])

        if(answer != 0):

            tt3_app_short_name = self.app_short_name[:-1] + "3"
            tt3_app = ttapps.Apptt_struct(short_name=tt3_app_short_name)

            bookId = self.app_short_name[:-4]
            imgId = self.task.info["page"]

            self.__downloadArchiveImages(bookId, imgId)
            self.__runLinesRecognition(bookId, imgId,
                                       answer[0]["text"]["girar"])

            try:
                # file with the lines recognitio
                arch = open("%s/books/%s/metadados/saida/image%s.txt" % (
                    app.config['TT3_BACKEND'], bookId, imgId))
                #get the lines recognitions
                coord_matrices = self.__splitFile(arch)
                for matrix_index in range(len(coord_matrices)):
                    info = dict(coords=coord_matrices[matrix_index],
                                page=imgId, img_url=self.__url_table(bookId,
                                imgId, matrix_index))
                    tt3_app.add_task(info)  # add task to tt3
            except IOError, e:
                print str(e)
            #TODO: the task will not be created,
            # routine to solve this must be implemented
            except Exception, e:
                print str(e)

    def close_task(self):
        pass

    def check_answer(self):
        task_runs = self.get_task_runs()
        n_taskruns = len(task_runs)  # task_runs goes from 0 to n-1
        if(n_taskruns > 1):
            answer1 = json.loads(task_runs[n_taskruns - 1].info)
            answer2 = json.loads(task_runs[n_taskruns - 2].info)
            print type(answer2)

            if answer1 == answer2:
                if answer2 != "0":
                    return self.__fileOutput(answer2)
                elif answer2 == "0":  # There is one error at TTTask1 answer
                    pass
        else:
            return False

    def __downloadArchiveImages(self, bookId, imgId, width=550, height=700):
        """
        Download internet archive images to tt3_backend project
        :returns: True if the download was successful
        :rtype: bool
        """

        try:
            url_request = requests.get(
                "http://archive.org/download/%s/page/n%s" % (
                bookId, imgId))
            fullImgPath = "%s/books/%s/alta_resolucao/image%s.png" % (
                app.config['TT3_BACKEND'], bookId, imgId)

            fullImgFile = open(fullImgPath, "w")
            fullImgFile.write(url_request.content)
            fullImgFile.close()

            url_request = requests.get(
                "http://archive.org/download/%s/page/n%s_w%d_h%d" % (
                bookId, imgId, width, height))

            lowImgPath = "%s/books/%s/baixa_resolucao/image%s.png" % (
                app.config['TT3_BACKEND'], bookId, imgId)
            lowImgFile = open(lowImgPath, "w")
            lowImgFile.write(url_request.content)
            lowImgFile.close()

            return True
        except IOError, e:
            print str(e)
        #TODO: Implement strategies for exceptions cases
        except RequestException, e:
            print str(e)
        except Exception, e:
            print str(e)

        return False

    def __runLinesRecognition(self, bookId, imgId, rotate="", model="1"):
        """
        Call cpp software that recognizes lines into the table and
        writes lines coords into \
        <tt3_backend_dir>/books/bookId/metadata/saida/image<imgId>.txt
        :returns: True if the write was successful
        :rtype: bool
        """
        if(rotate):
            rotate = "-r"

        #command shell to enter into the tt3 backend project and
        #calls the lines recognizer software
        command = 'cd %s/TableTranscriber/; ./tabletranscriber ' \
            '"/books/%s/baixa_resolucao/image%s.png" "model%s" "%s"' % (
            app.config['TT3_BACKEND'], bookId, imgId, model, rotate)

        call([command], shell=True)  # calls the shell command
        #TODO: implements exception strategy

    def __url_table(self, bookId, imgId, idx):
        """""
        Build a url of a splited image for the lines recognizer
        :returns: a indexed book table image
        :rtype: str
        """
        return "%s/books/%s/metadados/tabelasBaixa/image%s_%d.png" % (
            app.config['URL_TEMPLATES'], bookId, imgId, idx)

    def __splitFile(self, arch):
        """""
        Splits a given file and return a matrices list \
        where the lines with '#' are the index and the other \
        lines with values separated with ',' are the vectors \
        of the inner matrices
        :returns: a list of matrix
        :rtype: list
        """

        strLines = arch.read().strip().split("\n")
        matrix = []
        matrix_index = -1

        for line in strLines:
            if line.find("#") != -1:
                matrix_index += 1
                matrix.append([])
            else:
                line = line.split(",")
                for char_idx in range(len(line)):
                    line[char_idx] = int(line[char_idx])

                matrix[matrix_index].append(line)
        arch.close()
        return matrix

    def __fileOutput(self, answer):
        """""
        Writes tt2 answers into the file input for the lines recognitions
        :returns: True if the answer is saved at the file
        :rtype: bool
        """
        pb_app_name = self.app_short_name
        bookId = pb_app_name[:-4]
        imgId = self.task.info["page"]

        try:
            arch = open("%s/books/%s/metadados/entrada/image%s.txt" % (
                app.config["TT3_BACKEND"], bookId, imgId), "a")
            for table in answer:
                x0 = table["left"]
                x1 = table["width"] + x0
                y0 = table["top"]
                y1 = table["height"] + y0
                arch.write(
                    str(x0) + "," + str(y0) + "," +
                    str(x1) + "," + str(y1))
            arch.close()

            return True
        except IOError, e:
            print str(e)  # TODO: see what to do with the flow in exceptions

        return False