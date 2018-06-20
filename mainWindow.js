const PythonShell = require('python-shell');
const lay = require('./layout');

let expr;
let x0 = parseFloat($("#x0").val());;
let x1 = parseFloat($("#x1").val());;
let err = parseFloat($("#err").val());

// expr = "x**3+log(x)-5";
// x0 = 0.5;
// x1 = 2;
// err = 0.0000001


const validateInputs = (() => {

    if (toString(x0) != '' && x0 != undefined && x0 != NaN &&
        toString(x0) != '' && x1 != undefined && x1 != NaN &&
        toString(x0) != '' && err != undefined && err != NaN && (parseFloat(err) != 0) &&
        toString(x0) != '' && expr != undefined && expr != NaN) {
        return true;
    }
    return false;
});

// Update Values
$("#expr").blur(() => {
    expr = $("#expr").val();
    console.log(expr);
});
$("#x0").blur(() => {
    x0 = parseFloat($("#x0").val());
    console.log(x0);
});
$("#x1").blur(() => {
    x1 = parseFloat($("#x1").val());
    console.log(x1);
});
$("#err").focusout(() => {
    err = parseFloat($("#err").val());
    console.log(err);
});


$(".calculate").click(() => {
    if (validateInputs()) {

        $('main').empty();

        const options = {
            mode: 'text',
            pythonPath: '/home/giuseppe/Documents/Repos/Secant-Method-APP/python/venv-dir/bin/python',
            pythonOptions: ['-u', '-W ignore'], // get print results in real-time
            scriptPath: '/home/giuseppe/Documents/Repos/Secant-Method-APP/python',
            args: [expr, x0, x1, err]
        };

        let card = lay.card('progressCard', lay.progress());
        $('main').prepend(card);


        PythonShell.run('secant-method.py', options, (err, res) => {

            if (err) throw err;

            let json = JSON.parse(res[0]);
            console.log(json);

            if (json.result.length != 0 && json.graph.length != 0) {

                const xFinal = json.result[0].xFinal;
                const yFinal = json.result[0].yFinal;
                const xValues = json.result[0].xValues;
                const yValues = json.result[0].yValues;
                const interations = json.result[0].i;
                const titles = json.result[0].ids;
                const graph = json.graph[0].html;

                $('main').empty();

                card = lay.card('bestCard', lay.bestResult(xFinal, yFinal, interations))
                $('main').append(card);

                card = lay.card('graphCard', graph);
                $('main').append(card);

                card = lay.card('allCard', lay.allResult());
                $('main').append(card);
                for (let i = 0; i < xValues.length; i++) {
                    $('#allResult').append(lay.result(i, titles[i], xValues[i], yValues[i]));
                }
            } else if (json.graph.length != 0) {

                const graph = json.graph[0].html;

                $('main').empty();

                card = lay.card('graphCard', graph);
                $('main').append(card);
            }
            else {
                $('main').empty();
                alert('err');
            }

            // console.log(res);
            // console.log(res[0]);

            // if (json.err[0]) {
            //     $('.tmp').remove();
            //     console.log(json.err);
            // }

            // console.log(json);



        });
    }

});
