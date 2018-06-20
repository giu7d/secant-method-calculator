const card = (id, view) => {
    let layout = "";
    layout += '<div id="' + id + '" class="row">';
    layout += '     <div class="col s10 offset-s1">';
    layout += '         <div class="card">';
    layout += '             <div class="card-content">';
    layout += view;
    layout += '</div></div></div></div>';
    
    return layout;
}

const progress = () => {
    let layout = "";
    layout += '<div class="progress"><div class="indeterminate"></div></div>';

    return layout;
}

const bestResult = (x, y, i) => {
    let layout = "";
    layout += '<span class="card-title"><i class="material-icons" style="margin-right: 14px;">done</i>Melhor resultado</span>';
    layout += '<table class="striped"><thead><tr>';
    layout += '<th>x</th>';
    layout += '<th>f(x)</th>';
    layout += '<th>qtd. de iterações</th>';
    layout += '</tr></thead><tbody><tr>';
    layout += '<td>' + x + '</td>';
    layout += '<td>' + y + '</td>';
    layout += '<td>' + i + '</td>';
    layout += '</tr></tbody></table>'

    return layout
}

const allResult = () => {
    let layout = "";
    layout += '<span class="card-title"><i class="material-icons" style="margin-right: 14px;">done</i>Todos os resultados</span>';
    layout += '<table class="striped"><thead><tr>';
    layout += '<th>k</th>';
    layout += '<th></th>';
    layout += '<th>x</th>';
    layout += '<th>f(x)</th>';
    layout += '</tr></thead><tbody id="allResult">';
    // layout +=  '<td>' + bestX + '</td>';
    // layout +=  '<td>' + bestY + '</td>';
    // layout +=  '<td>' + iterations + '</td>';
    layout += '</tbody></table>'

    return layout
}

const result = (i, title, x, y) => {
    let layout = "";
    layout += '<tr><td>' + i + '</td>';
    layout += '<td>' + title + '</td>';
    layout += '<td>' + x + '</td>';
    layout += '<td>' + y + '</td></tr>';

    return layout
}

module.exports.card = card;
module.exports.progress = progress;
module.exports.bestResult = bestResult;
module.exports.allResult = allResult;
module.exports.result = result;