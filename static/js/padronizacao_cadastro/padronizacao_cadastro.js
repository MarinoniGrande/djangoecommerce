

/**
 *  função para utilizar o resize() da tabela e debugar o conteúdo quando fica em display none.
 * @param variavelTable variável da tabela instanciada, pode conseguir em " let table = $("#div_da_tabela").dxDataGrid(options).dxDataGrid('instance');"
 * @param time tempo para esperar o modal abrir ou a tabela sair do display none após o click da div, recomendável de 200
 */
function resizeTable(variavelTable, time) {
    setTimeout(function () {
        variavelTable.refresh();
    }, time);
}

/**
 * função para deixar em tela cheia o conteúdo
 * @param id id de um elemento que esteja acima do que você deseja expandir, por exemplo: "modal-user"
 * @param classAlvo classe seletora do conteúdo que deseja expandir, por exemplo: "modal-dialog"
 */
function fullscreen(id, classAlvo) {
    var alvo = document.getElementById(id).getElementsByClassName(classAlvo)[0];
    if (alvo.getAttribute('data-fullscreen') === 'true') {
        document.getElementById(id).getElementsByClassName(classAlvo)[0].classList.remove('fullscreen');
        document.getElementById(id).getElementsByClassName(classAlvo)[0].setAttribute('data-fullscreen', 'false');
    } else {
        document.getElementById(id).getElementsByClassName(classAlvo)[0].classList.add('fullscreen');
        document.getElementById(id).getElementsByClassName(classAlvo)[0].setAttribute('data-fullscreen', 'true');
    }
}


$("a, label").keypress(function (e) {
    if (e.which === 13) {
        this.click();
    }
});

/**
 * função para debugar o backdrop do modal
 */
$("#modal_confirmacao, #modal_alerta")
    .on({
        'shown.bs.modal': function () {
            $(".fade.show.stacked").removeClass('modal-backdrop');
        }
    })
    .on({
        'hide.bs.modal': function () {
            $(".fade.show.stacked").addClass('modal-backdrop');
        }
    });
$('.modal')
    .on({
        'show.bs.modal': function () {
            var idx = $('.modal:visible').length;
            $(this).css('z-index', 1040 + (10 * idx));
            if ($('.modal-backdrop').not('.modal').hasClass('fade')) {
                $('.modal-backdrop').css('display', 'none');
            }
        },
        'shown.bs.modal': function () {
            var idx = ($('.modal:visible').length) - 1; // raise backdrop after animation.
            $('.modal-backdrop').not('.stacked')
                .css('z-index', 1039 + (10 * idx))
                .addClass('stacked');
        },
        'hidden.bs.modal': function () {
            if ($('.modal:visible').length > 0) {
                // restore the modal-open class to the body element, so that scrolling works
                // properly after de-stacking a modal.
                setTimeout(function () {
                    $('.modal-backdrop').not('.modal').css('display', 'block');
                    $('.modal.modal-backdrop').removeClass('modal-backdrop');
                }, 0);
            }
        }
    });

/**
 * função para deixar o modal possível para que consiga digitar algo atrás
 */
$(".modalBackDropEditavel").on('shown.bs.modal', function () {
    $(document).off('focusin.modal');
});



function sairCadastro(_this_modalAlert, _this_modalCadastro, _this) {
    var modalCadastro = $("#" + _this_modalCadastro);
    if (_this === "seletorBtnSalvar") {
        modalCadastro.find('.seletorBtnSalvar')[0].click();

        $("#" + _this_modalAlert).modal('hide');
    }
    if (_this === "seletorBtnNaoSalvar") {
        $("#" + _this_modalAlert).modal('hide');
        _itsSave = true;
    }
    //execute ação
    if(_itsSave === false){
        let dictOpcoes = {
            acao: function(){
                modalCadastro.modal('hide');
            }
        };
        let cadastro = "";
        temporizador(cadastro, dictOpcoes)
    } else {
        modalCadastro.modal('hide');
    }
}


/**
 * função para quando o modal de cadastro estiver abrindo debugar o backdrop que seria aquele fundo escuro
 * função para quando o modal de cadastro estiver fechando verificar se foi salvo o conteúdo para exibir o alerta caso não esteja salvo
 * função para quando o modal de cadastro estiver fechado limpar o conteúdo debugar os tooltips que sobrepõe o modal e habilitar o scroll do body
 */
$(".modal-padrao-cadastros-modal")
//modal de cadastro abrindo
    .on('shown.bs.modal', function () {

        document.body.style.overflow = 'hidden';
        $('.tooltip').remove();
        var _this_modalCadastro = this;
        $("#modal_alerta")
            .on("shown.bs.modal", function () {
                _this_modalCadastro.classList.remove('modal-backdrop');
            })
            .on('hide.bs.modal', function () {
                _this_modalCadastro.classList.add('modal-backdrop');
            });
    })
    //modal de cadastro fechando
    .on('hide.bs.modal', function () {
        var _this_modalCadastro = this;
        if (_itsSave === false) {
            $("#modal_alerta").on("shown.bs.modal", function () {
                $('.fade.stacked').removeClass('modal-backdrop');
                var _this_modalAlert = this;
                $(_this_modalAlert).find('.seletorBtnNaoSalvar').on('click', function () {
                    sairCadastro(_this_modalAlert.id, _this_modalCadastro.id, 'seletorBtnNaoSalvar');
                    $("#modal_alerta").off("shown.bs.modal");
                });
                $(_this_modalAlert).find('.seletorBtnSalvar').on('click', function () {
                    sairCadastro(_this_modalAlert.id, _this_modalCadastro.id, 'seletorBtnSalvar');
                    $("#modal_alerta").off("shown.bs.modal");
                });
            }).modal("show");
            return false;
        }
    })
    // modal de cadastro fechado
    .on('hidden.bs.modal', function () {
        $(this).find(".btnNovo").click();
        $(this).find('.seletorBtnSalvar').addClass('isDisabled');
        $('.tooltip').remove();
        setTimeout(function () {
            document.body.style.overflow = 'auto';
        }, 100);
    });



/**
 * @let _itsSave variável para status do conteúdo do cadastro, caso o usuário altere algum campo de origem _itsSave = false;
 */
let _itsSave = true;

/**
 * @let _ultimoObjetoSalvo recebe um dict com todos os campos com o último status salvo;
 */
let _ultimoObjetoSalvo;

/**
 * função para ir a primeira posição da tabela
 * @param e todos os dados referente a tabela
 */
function btnFirstNavegacao(e) {
    let cadastro = e.component.cadastro;
    let key = cadastro._modalCadastro.find("*[name='" + cadastro._key + "']").val();
    return e.component._options._optionManager._options.dataSource._store._array[0];
}

/**
 * função para ir a anterior posição da tabela
 * @param e todos os dados referente a tabela
 */
function btnPrevNavegacao(e) {
    let cadastro = e.component.cadastro;
    let key = cadastro._modalCadastro.find("*[name='" + cadastro._key + "']").val();
    let i = 0,
        arrayDeObjetos = e.component._options._optionManager._options.dataSource._store._array;
    while (i < arrayDeObjetos.length) {
        if (key === arrayDeObjetos[i][cadastro._key]) {
            if (i - 1 >= 0) {
                return arrayDeObjetos[i - 1];
            } else {
                return arrayDeObjetos[i];
            }
        } else if (key === undefined || key === "" || key === null) {
            return arrayDeObjetos[0];
        }
        i++;
    }
}

/**
 * função para ir a próxima posição da tabela
 * @param e todos os dados referente a tabela
 */
function btnNextNavegacao(e) {
    let cadastro = e.component.cadastro;
    let key = cadastro._modalCadastro.find("*[name='" + cadastro._key + "']").val();
    let i = 0,
        arrayDeObjetos = e.component._options._optionManager._options.dataSource._store._array;
    while (i < arrayDeObjetos.length) {
        if (key === arrayDeObjetos[i][cadastro._key]) {

            if (i + 1 <= arrayDeObjetos.length - 1) {
                return arrayDeObjetos[i + 1];
            } else {
                return arrayDeObjetos[i];
            }
        } else if (key === undefined || key === "" || key === null) {
            return arrayDeObjetos[0];
        }
        i++;
    }
}

/**
 * função para ir a última posição da tabela
 * @param e todos os dados referente a tabela
 */
function btnLastNavegacao(e) {
    let cadastro = e.component.cadastro;
    let key = cadastro._modalCadastro.find("*[name='" + cadastro._key + "']").val();
    return e.component._options._optionManager._options.dataSource._store._array[e.component._options._optionManager._options.dataSource._store._array.length - 1];
}

/**
 * função para ir a última posição da tabela
 * @param e todos os dados referente a tabela
 * @param dictOpcoes dict com as opções _btnClassSeletor e _btnClick()
 * _btnClassSeletor: "seletorBtnSalvar" classe para seleção do botão dentro do modalCadastro em e.component.cadastro.modalCadastro
 * _btnClick: function(){ //acão do botão após o conteúdo do modalCadastro estiver com conteúdo salvo }
 */
function btnClickComVerificacaoDeSalvouConteudo(e, dictOpcoes) {
    e.component.cadastro._modalCadastro.find('.' + dictOpcoes._btnClassSeletor).on('click', function () {
        if (_itsSave === true) {
            dictOpcoes._btnClick();
        } else {
            alertaUsuarioAlterouENaoSalvou(e, dictOpcoes._btnClassSeletor);
        }
    });
}

/**
 * função para limpar os campos do formuário de cadastro
 * @param e todos os dados da tabela
 */
function limparInputsCadastro(e) {
    let cadastro = e.component.cadastro;
    var inputs = cadastro._modalCadastro.find('input');
    for (let input of inputs) {
        if ($(input).attr("type") !== "checkbox" && $(input).attr("type") !== "radio") {
            if ($(input).attr("name") !== "cd_filial" && $(input).attr("name") !== "csrfmiddlewaretoken" && $(input).attr("name") !== "form_criacao" && $(input).attr("name") !== "form_edicao" && $(input).attr("name") !== "model") {
                $(input).val("");
            }
        }
    }
    cadastro._modalCadastro.find('select').val("").trigger('change');
    cadastro._modalCadastro.find('textarea').val("");
    cadastro._modalCadastro.find('input[type=checkbox]').prop("checked", false);
    cadastro._modalCadastro.find('input[type=radio]').prop("checked", false);
}

/**
 * @param e todos os dados referente a tabela
 * @param dataObject objeto recebido para setar cada campo do objeto no correspondente input do cadastro, a chave
 * do objeto deve existir um input com classe name correspondente por exemplo no dict { nome: "Nome" } ele irá procurar
 * um input dentro do modalCadastro em e.component.cadastro._modalCadastro e setar o valor "Nome"
 * se for input type checkbox ou input type radio utilize no objeto o valor false ou true para dizer não checado ou checado.
 */
function setValorNosInputCadastro(e, dataObject) {
    let cadastro = e.component.cadastro;
    if (dataObject !== undefined) {

        Object.keys(dataObject).forEach(function (name) {
            if (cadastro._modalCadastro.find("*[name='" + name + "']").attr('type') === "checkbox") {
                cadastro._modalCadastro.find("*[name='" + name + "']").prop("checked", dataObject[name]);
            } else if (cadastro._modalCadastro.find("*[name='" + name + "']").attr('type') === "radio") {
                for (let radio of cadastro._modalCadastro.find("*[name='" + name + "']")) {
                    $(radio).prop("checked", false);
                    if ($(radio).val() === dataObject[name]) {
                        $(radio).click();
                    }
                }
            } else if (cadastro._modalCadastro.find("select[name='" + name + "']").length > 0) {
                $(cadastro._modalCadastro.find("select[name='" + name + "']")).val(dataObject[name]).trigger('change.select2');
            } else {
                if(cadastro._modalCadastro.find("*[name='" + name + "']").val(dataObject[name]) !== undefined){
                    cadastro._modalCadastro.find("*[name='" + name + "']").val(dataObject[name]);
                }
            }
        });
        $('.tooltip').remove();
        _itsSave = true;
        //verificar se for input text ou checkbox radio select etc para fazer o armazenamento e carregar os dados da forma correta
    }
}

/**
 * @param cadastro e.componente.cadastro dados referente a tabela
 * @param _btnClassSeletor btn que acionou esse temporizador para esperar o ajax voltar e executar a ação.
 */
function temporizador(cadastro, dictOpcoes) {
    if (_itsSave === true) {
        dictOpcoes.acao();
    } else {
        setTimeout(function () {
            temporizador(cadastro, dictOpcoes);
        }, 100);
    }
}

/** função para alertar o usuário que ele não salvou seu conteúdo após o usuário e possibilitando que o mesmo salve, cancele para não executar nenhuma ação, e não salve e prossiga com sua ação.
 * @param e todos os dados referente a tabela
 * @param _btnClassSeletor recebe uma string contendo uma classe utilizada para seletor do elemento que quando clicado deve chamar a função que abre o modal para o usuário salvar seu conteúdo
 */
function alertaUsuarioAlterouENaoSalvou(e, dictOpcoes) {
    // chamar funcao para atualizar
    let cadastro = e.component.cadastro;

    $('.fade.stacked').removeClass('modal-backdrop');
    cadastro._modalAlerta.find('.btnsAcao').html(`
                                        <a class="btn btn-primary w-100 text-white mr-1 px-3 seletorBtnSalvar" tabindex="0">Salvar</a>
                                        <a class="btn btn-outline-secondary w-100 mr-1 px-3" data-dismiss="modal" tabindex="0">Cancelar</a>
                                        <a class="btn btn-danger w-100 text-white mr-1 px-3 seletorBtnNaoSalvar" tabindex="0">Não Salvar</a>`);
    cadastro.usuarioRespondeu = false;
    cadastro._modalAlerta.modal('hide')
        .on('hide.bs.modal', function () {
            $('.fade.stacked').addClass('modal-backdrop');
            cadastro.usuarioRespondeu = true;
            _itsSave = false;
            cadastro._modalAlerta.off('shown.bs.modal');
        });

    cadastro._modalAlerta
        .on('shown.bs.modal', function setClicks() {
            cadastro._modalAlerta.find('.seletorBtnSalvar').on('click', function () {
                dictOpcoes._modalCadastroOuContainer.find('.seletorBtnSalvar').click();
                if (_itsSave === false) {
                    dictOpcoes.acao = function(){
                        dictOpcoes._modalCadastroOuContainer.find('.' + dictOpcoes._btnClassSeletor).click();
                    };
                    temporizador(cadastro, dictOpcoes);
                }
                cadastro._modalAlerta.modal('hide');
                cadastro.usuarioRespondeu = true;
                cadastro._modalAlerta.off('shown.bs.modal');
            });
            cadastro._modalAlerta.find('.seletorBtnNaoSalvar').on('click', function () {
                setValorNosInputCadastro(e, _ultimoObjetoSalvo);
                cadastro._modalAlerta.modal('hide');
                cadastro.usuarioRespondeu = true;
                _itsSave = true;
                dictOpcoes._modalCadastroOuContainer.find('.' + dictOpcoes._btnClassSeletor).click();
                cadastro._modalAlerta.off('shown.bs.modal');
            })

        })
        .modal('show');
}

/** função para abrir modal e verifica se a key está vazia para impossibilitar o usuário de remover algo que não existe
 * @param e todos os dados referente a tabela
 */
function abraModalCadastro(e) {
    _itsSave = true;

    e.component.cadastro._modalCadastro.find('.seletorBtnSalvar').addClass('isDisabled');
    for (let botao of e.component.cadastro._modalCadastro.find(".seletorModal-footer-btns").find('a')) {
        $(botao).off('click');
    }

    e.component.cadastro._modalCadastro.on('shown.bs.modal', function () {

        if (e.component.cadastro._modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== undefined && e.component.cadastro._modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== null && e.component.cadastro._modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== "") {
            e.component.cadastro._modalCadastro.find('.btnExcluir').removeClass('isDisabled');
        } else {
            e.component.cadastro._modalCadastro.find('.btnExcluir').addClass('isDisabled');
        }
    }).modal('show');
    // deixando melhor usabilidade de tabIndex
    $("a").off('keyup').on('keyup', function (e) {
        // 13 = enter
        if (e.which === 13) {
            this.click();
        }
    });

}

/**
 * função para dizer que foi alterado algum registro em input dentro do e.component.cadastro.modalCadastro
 * @param e todos os dados referente a tabela
 */
function alterandoStatusDeSalvouConteudo(e, modalCadastro) {

    if (modalCadastro !== undefined && modalCadastro !== "" && modalCadastro !== null) {
    } else {
        modalCadastro = e.component.cadastro._modalCadastro;
    }
    _itsSave = true;
    modalCadastro.find('.seletorBtnSalvar').addClass('isDisabled');
    const inputs = modalCadastro.find("select, input, textarea");
    if (inputs.length > 0)
        for (let input of inputs) {
            $(input).on('change', function trocou() {
                _itsSave = false;
                modalCadastro.find('.seletorBtnSalvar').removeClass('isDisabled');

                if(typeof e.component.cadastro === "undefined"){
                } else {
                    if (modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== undefined &&
                        modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== null &&
                        modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== "") {
                        modalCadastro.find('.btnExcluir').removeClass('isDisabled');
                    } else {
                        modalCadastro.find('.btnExcluir').addClass('isDisabled');
                    }
                }

                // modal de cadastro fechado
                modalCadastro.on('hidden.bs.modal', function () {
                    $(input).off('change', trocou);
                });
            });
            if ($(input).attr("type") === "text")
                $(input).on('keyup', function trocou() {
                    _itsSave = false;
                    modalCadastro.find('.seletorBtnSalvar').removeClass('isDisabled');

                    if(typeof e.component.cadastro === "undefined"){
                    } else {
                        if (modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== undefined &&
                            modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== null &&
                            modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== "") {
                            modalCadastro.find('.btnExcluir').removeClass('isDisabled');
                        } else {
                            modalCadastro.find('.btnExcluir').addClass('isDisabled');
                        }
                    }

                    modalCadastro.on('hidden.bs.modal', function () {
                        $(input).off('keyup', trocou);
                    });
                });
        }
}

/**
 * função para pegar os dados em inputs dentro do e.component.cadastro.modalCadastro e defini-los como
 * dados iniciais para caso seja clicado em não salvar ao alterar o registro será o ponto de origem os dados inicias
 * @param e todos os dados referente a tabela
 */
function pegarObjetoInicial(e) {
    let dadosAtuaisDoCadastro = e.component._options._optionManager._options.dataSource._store._array[0];
    let objetoInicial = {};
    if (dadosAtuaisDoCadastro !== undefined) {
        Object.keys(dadosAtuaisDoCadastro).forEach(function (name) {
            if (e.component.cadastro._modalCadastro.find("*[name='" + name + "']").val() === undefined || e.component.cadastro._modalCadastro.find("*[name='" + name + "']").val() === null) {
                objetoInicial[name] = "";
            } else {
                objetoInicial[name] = e.component.cadastro._modalCadastro.find("*[name='" + name + "']").val();
            }
        });
    }
    _ultimoObjetoSalvo = objetoInicial;
}

/**
 * Ao clicar no botão ele abrirá um modal de confirmação e espera que o usuário responda para executar a ação
 * @param e todos os dados referente a tabela
 * @param dictOpcoes json de opções do modal de confirmação pode obter
 * Opções:
 * _modalCadastroOuContainer: e.component.cadastro._modalCadastro ou container da celula na tabela
 * _btnClassSeletor: class para procurar o botão dentro do e.component.cadastro.modalCadastro
 * _modalConfirmacao_titulo: Título do modal de confirmação exemplo: "Excluir este usuário?"
 * _modalConfirmacao_mensagem: Mensagem do modal de confirmação exemplo: "Tem certeza que deseja excluir o usuário Matrícula - Nome ?"
 * _modalConfirmacao_btnAcao_texto: Texto do botão de ação do modal de confirmação exemplo: "Excluir usuário"
 * _modalConfirmacao_btnAcao_class: Classe do botão de ação do modal de confirmação apenas a classe de cor do botão exemplo: btn-acoes, btn-danger ou btn-primary, obs: não é necessário a classe "btn" ou qualquer outra
 * _modalConfirmacao_btnAcao_click: exemplo: function(){ //aqui você codifica o que vai acontecer quando o usuário clicar no botão de ação do modal de confirmação }
 */
function opcoesModalConfirmacao(e, dictOpcoes) {
    // btn
    dictOpcoes._modalCadastroOuContainer.find('.' + dictOpcoes._btnClassSeletor).on('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        //Ação do botão
        let btnAcoes = dictOpcoes._modalCadastroOuContainer.attr('role') === "gridcell";
        let valor_da_chave;
        if (btnAcoes === false) {
            valor_da_chave = dictOpcoes._modalCadastroOuContainer.find("*[name='" + e.component.cadastro._key + "']").val();
        }
        if (valor_da_chave !== undefined && valor_da_chave !== null && valor_da_chave !== "" || btnAcoes === true) {
            if (_itsSave === true || btnAcoes === true) {
                // dados do modal

                var mensagem;
                if (btnAcoes === true) {
                    mensagem = dictOpcoes._modalConfirmacao_mensagem_comeco +
                        dictOpcoes._modalConfirmacao_dados_1 + ` - ` + dictOpcoes._modalConfirmacao_dados_2 +
                        dictOpcoes._modalConfirmacao_mensagem_final;
                }
                else {
                    if(typeof dictOpcoes._modalConfirmacao_dados_1 === "string" && typeof dictOpcoes._modalConfirmacao_dados_2 === "string"){
                        mensagem = dictOpcoes._modalConfirmacao_mensagem_comeco +
                            dictOpcoes._modalConfirmacao_dados_1 + ` ` + dictOpcoes._modalConfirmacao_dados_2 +
                            dictOpcoes._modalConfirmacao_mensagem_final;
                    } else {
                        mensagem = dictOpcoes._modalConfirmacao_mensagem_comeco;
                        if(dictOpcoes._modalConfirmacao_dados_1) {
                            mensagem += dictOpcoes._modalConfirmacao_dados_1.val();
                        }
                        if(dictOpcoes._modalConfirmacao_dados_2) {
                            mensagem += ` - ` + dictOpcoes._modalConfirmacao_dados_2.val();
                        }
                        mensagem += dictOpcoes._modalConfirmacao_mensagem_final;
                    }
                }

                if(dictOpcoes._modalConfirmacao_tamanho){
                    dictOpcoes._modalConfirmacao_tamanho += " modal-dialog "
                } else {
                    dictOpcoes._modalConfirmacao_tamanho = "modal-dialog modal-sm"
                }

                if(!e)
                    e = {component:{cadastro:{_modalConfirmacao:$("#modal_confirmacao")}}};

                e.component.cadastro._modalConfirmacao.find('.seletorBtnAcao').off('click');

                if(dictOpcoes._fecharModal) {
                }
                else
                    e.component.cadastro._modalConfirmacao.find('.seletorBtnAcao').off('click');
                e.component.cadastro._modalConfirmacao.find('.modal-title').text(dictOpcoes._modalConfirmacao_titulo);
                e.component.cadastro._modalConfirmacao.find('.messageBody').html(mensagem);
                e.component.cadastro._modalConfirmacao.find('[role="document"]').removeClass().addClass(dictOpcoes._modalConfirmacao_tamanho);
                if(dictOpcoes._modalConfirmacao_messageMuted)
                    e.component.cadastro._modalConfirmacao.find('.messageMuted').html(dictOpcoes._modalConfirmacao_messageMuted);
                else
                    e.component.cadastro._modalConfirmacao.find('.messageMuted').html("Não será mais possível recupera-lo.");
                e.component.cadastro._modalConfirmacao.find('.seletorBtnAcao').text(dictOpcoes._modalConfirmacao_btnAcao_texto);
                e.component.cadastro._modalConfirmacao.find('.seletorBtnAcao').removeClass('btn-danger btn-acoes btn-tabelas btn-primary btn-danger btn-success btn-warning btn-dark btn-plus btn-light btn-secondary').addClass(dictOpcoes._modalConfirmacao_btnAcao_class);
                e.component.cadastro._modalConfirmacao.find('.seletorBtnAcao').on('click', function registro(ev) {
                    // ação do botão dentro do modalConfirmacao
                    dictOpcoes._modalConfirmacao_btnAcao_click();
                    if(dictOpcoes._fecharModal) {
                    }
                    else
                        e.component.cadastro._modalConfirmacao.find('.seletorBtnAcao').off('click', registro);
                    if(dictOpcoes._fecharModal){

                    }
                    else
                        e.component.cadastro._modalConfirmacao.modal('hide');

                    e.component.refresh();
                    // end success
                });
                e.component.cadastro._modalConfirmacao.modal("show");
                $('.tooltip').remove();
            } else {
                alertaUsuarioAlterouENaoSalvou(e, dictOpcoes);
            }
        }
    });
}

/**
 * função para inserir ou atualizar o registro da tabela
 * @param e todos os dados referente a tabela
 */
function atualizarOuInserirRegistro(e) {
    let cadastro = e.component.cadastro;
    let modeloDeDadosVazio = e.component._options._optionManager._options.dataSource._store.modeloDeDadosVazio;
    let novoObjeto = {};

    if (modeloDeDadosVazio !== undefined) {
        Object.keys(modeloDeDadosVazio).forEach(function (name) {
            if (cadastro._modalCadastro.find("*[name='" + name + "']").val() === undefined || cadastro._modalCadastro.find("*[name='" + name + "']").val() === null) {
                novoObjeto[name] = modeloDeDadosVazio[name];
            } else {
                if (cadastro._modalCadastro.find("*[name='" + name + "']").attr('type') === "checkbox") {
                    novoObjeto[name] = cadastro._modalCadastro.find("*[name='" + name + "']").is(":checked");
                } else if (cadastro._modalCadastro.find("*[name='" + name + "']").attr('type') === "radio") {
                    novoObjeto[name] = cadastro._modalCadastro.find("*[name='" + name + "']:checked").val();
                } else if (cadastro._modalCadastro.find("select[name='"+ name +"']").length > 0 ){
                    novoObjeto[name] = $("select[name='"+ name +"']").select2("data")[0].text;
                }
                else {
                    novoObjeto[name] = cadastro._modalCadastro.find("*[name='" + name + "']").val();
                }
            }
        });
        e.component.byKey(novoObjeto[cadastro._key]).done(function (dataObject) {
            // execute ação se existir o id na tabela edite-o
            Object.keys(dataObject).forEach(function (name) {
                dataObject[name] = novoObjeto[name];
            });
            e.component.saveEditData();
        }).fail(function (error) {
            // caso erro de não existir o id crie a linha na tabela
            //função para adicionar o objeto cadastro no dict da tabela
            e.component._options._optionManager._options.dataSource._store._array.unshift(novoObjeto);
            // função para atualizar a tabela
            e.component.refresh();
        });
        //alerta
        toastr.success('Você salvou um registro com sucesso!', 'Registro salvo');
        cadastro._modalCadastro.find('.seletorBtnSalvar').addClass('isDisabled');
        _itsSave = true;
        pegarObjetoInicial(e);
        if (cadastro._modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== undefined &&
            cadastro._modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== null &&
            cadastro._modalCadastro.find("*[name='" + e.component.cadastro._key + "']").val() !== "") {
            cadastro._modalCadastro.find('.btnExcluir').removeClass('isDisabled');
        } else {
            cadastro._modalCadastro.find('.btnExcluir').addClass('isDisabled');
        }
    }
}
