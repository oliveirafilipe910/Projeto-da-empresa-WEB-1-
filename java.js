/**
 * Função principal que serve como gatilho para a máscara.
 * @param {HTMLInputElement} o - O próprio campo de entrada (input).
 * @param {Function} f - A função de formatação que será aplicada (mphone).
 */
function mask(o, f) {
    // Usa um atraso de 1 milissegundo para garantir que o caractere 
    // digitado já esteja no valor do input antes de processar
    setTimeout(function() {
        // Envia o valor atual para a função mphone e guarda o resultado formatado
        var v = mphone(o.value);
        
        // Se o valor formatado for diferente do valor atual, atualiza o campo
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}

/**
 * Função que aplica as regras de formatação do telefone (RegEx).
 * @param {string} v - O texto bruto digitado pelo usuário.
 * @returns {string} - O texto formatado como telefone.
 */
function mphone(v) {
    // 1. Remove tudo o que não for número (D = não dígito)
    var r = v.replace(/\D/g, "");
    
    // 2. Remove o número 0 se ele for o primeiro dígito (evita 0 na frente do DDD)
    r = r.replace(/^0/, "");
    
    // 3. Verifica a quantidade de números para aplicar a máscara correta
    if (r.length > 10) {
        // Formato para CELULAR: (XX) XXXXX-XXXX
        // Pega os 2 primeiros dígitos, os 5 seguintes e os 4 finais
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        // Formato para FIXO: (XX) XXXX-XXXX
        // Pega os 2 primeiros dígitos, os 4 seguintes e os 4 finais
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        // Enquanto o usuário digita o DDD e o início do número: (XX) X
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        // Enquanto o usuário digita apenas o DDD: (X
        r = r.replace(/^(\d*)/, "($1");
    }
    
    // Retorna o valor final já com os parênteses e traços
    return r;
}