var en_US_dict = { 
    'question': "Please. Fix the content from the table cells.",
    'task_name': "Task: ",
    'well_done': "Well done! ",
    'saved': "Your answer has been saved",
    'congratulations': "Congratulations! ",
    'finished': "All the transcription tasks have been completed!",
    'back': "Go back ",
    'other_apps': "or, Check other applications",
    'error': "Error! ",
    'err_msg': "Something went wrong, please contact the site administrators.",
    'workflowtask' : "There are other types of tasks available. Click to try it.",
    'progress-from' : "You have completed: ",
    'progress-to' : "tasks from",
    'task-instruction-p1' : "<strong> Information </strong>",
    'task-instruction-p2' : "The <strong style='color: #339ACD'>blue</strong> cell is the one currently selected for checking its transcription;",
    'task-instruction-p3' : "The <strong style='color: #1BA038'>green</strong> cells show the transcriptions corrected by you or another user;",
    'task-instruction-p4' : "The <strong style='color: #E93F2D'>red</strong> cells show the transcriptions that need to be inspected and finished.",
    'task-instruction-p5' : "You can save the task any time, if you don't want to do the whole table transcription, you only need to click on <strong>Save fixes</strong>, so another user will continue from where you've stopped.",
    'button-finished-task' : 'Save fixes',
    'pc-transcription-p1' : 'The computer has ',
    'pc-transcription-p2' : '% of confidence on this transcription.',
    'human-transcription-label' : 'Transcription from another user',
    'your-transcription-label' : 'Your transcription',
    'button-zoom-in' : 'Zoom In tool',
    'button-zoom-out' : 'Zoom Out tool',
    'button-help' : 'Open the help window',
    'button-previous-cell' : 'Previous cell',
    'button-next-cell' : 'Next cell',
    'completed' : 'completed!',
    'button_bug_report' : 'Point an error in the task'
};

var pt_dict= {
    'question': "Por favor. Corrija o conteúdo das células da tabela.",
    'task_name': "Tarefa: ",
    'well_done': "Muito bem! ",
    'saved': "Sua resposta foi salva",
    'congratulations': "Parabéns! ",
    'finished': "Todas as tarefas de transcrição foram finalizadas",
    'back': "Voltar ",
    'other_apps': "ou, verificar outras aplicações",
    'error': "Erro! ",
    'err_msg': "Algo ocorreu errado, por favor contate o administrador do site.",
    'workflowtask' : "Há outros tipos de tarefas disponíveis. Clique para ir.",
    'progress-from' : "Você fez ",
    'progress-to' : "tarefas de ",
    'task-instruction-p1' : "<strong> Informações </strong>",
    'task-instruction-p2' : "A célula em <strong style='color: #339ACD'>azul</strong> é a célula atualmente selecionada para você verficar a transcrição;",
    'task-instruction-p3' : "Células em <strong style='color: #1BA038'>verde</strong> indicam transcrições corrigidas por você ou por outro usuário;",
    'task-instruction-p4' : "Células em <strong style='color: #E93F2D'>vermelho</strong> indicam transcrições que faltam ser inspecionadas e finalizadas.",
    'task-instruction-p5' : "Você pode salvar a tarefa a qualquer momento, caso não queira fazer a transcrição da tabela inteira, basta clicar em <strong>Salvar correções</strong>, para que outro usuário continue de onde você parou.",
    'button-finished-task' : 'Salvar correções',
    'pc-transcription-p1' : 'O computador tem ',
    'pc-transcription-p2' : '% de confiança na transcrição abaixo.',
    'human-transcription-label' : 'Transcrição de outro usuário',
    'your-transcription-label' : 'Sua transcrição',
    'button-zoom-in' : 'Ferramenta de Zoom In',
    'button-zoom-out' : 'Ferramenta de Zoom Out',
    'button-help' : 'Abre a tela de ajuda',
    'button-previous-cell' : 'Célula anterior',
    'button-next-cell' : 'Próxima célula',
    'completed' : 'finalizados!',
    'button_bug_report' : 'Aponte um erro na tarefa'
};

var language = navigator.language? navigator.language : navigator.userLanguage;

switch(language){
	case 'en-US': var dict = en_US_dict;	break;
	case 'pt-BR': var dict = pt_dict; break;
	default: var dict = en_US_dict; 
}

$.i18n.setDictionary(dict);