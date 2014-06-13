var en_US_dict = { 
    'question': "Place the lines and columns, in red, on the table below. If the placement is right, you only need to save.",
    'question_with_focus': "Place the lines and columns, in red, from the focused area on the table below. If their position is right, you only need to save",
    'question-warning': "<i>*Don't worry if you think you’ve made a mistake, just keep contributing! Each task is executed by many volunteers – you are not alone!</i>",
    'book-info': "You're helping the transcription of the book:",
    'task-type': 'Structure drawing task',
    'button_finished': "Save fixes",
    'button_select': "Enable the tool to select segments",
    'button_area': "Enable the tool to select the segments from a area",
    'button_add': "Enable the tool to add segments",
    'button_split': "Enable the tool to split segments",
    'button_remove': "Remove the selected segments (Shortcut DEL)",
    'button_help': "Open the help window",
    'task_name': "Task: ",
    'well_done': "Well done! ",
    'saved': "Your answer has been saved",
    'congratulations': "Congratulations! ",
    'finished': "All the tasks of struct fix have been completed!",
    'back': "Go back ",
    'other_apps': "or, Check other applications",
    'error': "Error! ",
    'err_msg': "Something went wrong, please contact the site administrators.",
    'workflowtask' : "There are other types of tasks available. Click to try it.",
    'progress-from' : "You have completed ",
    'progress-to' : "tasks from",
    'task-instruction-p1' : "<strong> Basic Instructions </strong>",
    'task-instruction-use-tool' : "You can use the tool ",
    'task-instruction-p2' : " to select and to adjust the position of a segment;",
    'task-instruction-p3' : " to select the segments from a area;",
    'task-instruction-p4-1' : "Click on the trash can ",
    'task-instruction-p4-2' : " or use the DEL key to remove the selected segments;",
    'task-instruction-p5-1' : "With the tool ",
    'task-instruction-p5-2' : " , click and drag to add a segment;",
    'task-instruction-p6' : " to split a segment on the nearest intersection point;",
    'task-instruction-p7-1' : "Click on ",
    'task-instruction-p7-2' : " to solve doubts and advanced shortcuts.",
    'completed' : 'completed!'
};

var pt_dict= {
    'question': "Posicione as linhas e colunas, em vermelho, da tabela abaixo. Se o posicionamento estiver adequado, basta salvar.",
    'question_with_focus': "Posicione as linhas e colunas, em vermelho, da área em foco da tabela abaixo. Se o posicionamento estiver adequado, basta salvar.",
    'question-warning': "<i>*Não se preocupe se você acha que fez algo errado, continue contribuindo! Cada tarefa é executada por diversos voluntários – você não está sozinho!</i>",
    'book-info': 'Você está ajudando a transcrever o livro:',
    'task-type': 'Tarefa de desenho da estrutura',
    'button_finished': "Salvar correções",
    'button_select': "Habilita a ferramenta de seleção de segmentos",
    'button_area': "Habilita a ferramenta de seleção em área",
    'button_add': "Habilita a ferramenta de adição de segmentos",
    'button_split': "Habilita a ferramenta de partição de segmentos",
    'button_remove': "Remove os segmentos selecionados (Atalho DEL)",
    'button_help': "Abre a tela de ajuda",
    'task_name': "Tarefa: ",
    'well_done': "Muito bem! ",
    'saved': "Sua resposta foi salva",
    'congratulations': "Parabéns! ",
    'finished': "Todas as tarefas de correção de estrutura foram finalizadas",
    'back': "Voltar ",
    'other_apps': "ou, verificar outras aplicações",
    'error': "Erro! ",
    'err_msg': "Algo ocorreu errado, por favor contate o administrador do site.",
    'workflowtask' : "Há outros tipos de tarefas disponíveis. Clique para ir.",
    'progress-from' : "Você fez ",
    'progress-to' : "tarefas de um total de",
    'task-instruction-p1' : "<strong> Instru&ccedil;&otilde;es b&aacute;sicas</strong>",
    'task-instruction-use-tool' : "Use a ferramenta ",
    'task-instruction-p2' : " para selecionar e ajustar a posição de um segmento;",
    'task-instruction-p3' : " para selecionar os segmentos de uma área;",
    'task-instruction-p4-1' : "Clique na lixeira ",
    'task-instruction-p4-2' : " ou use a tecla DEL para remover os segmentos selecionados;",
    'task-instruction-p5-1' : "Com a ferramenta ",
    'task-instruction-p5-2' : " , clique e arraste o mouse para adicionar um segmento;",
    'task-instruction-p6' : " para dividir o segmento na intersecção mais próxima;",
    'task-instruction-p7-1' : "Clique em ",
    'task-instruction-p7-2' : " para soluções de dúvidas e atalhos avançados.",
    'completed' : 'finalizados!'
};

var language = navigator.language? navigator.language : navigator.userLanguage;

switch(language){
	case 'en-US': var dict = en_US_dict;	break;
	case 'pt-BR': var dict = pt_dict; break;
	default: var dict = en_US_dict; 
}

$.i18n.setDictionary(dict);
