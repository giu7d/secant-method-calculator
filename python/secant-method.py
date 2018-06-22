import sys
import parser
import codecs
import json
from numpy import *
from plotly.offline import plot
from plotly.graph_objs import Scatter, Layout, Figure

data = {}
data['result'] = []
data['graph'] = []
data['request'] = []
data['err'] = []

values = [] # Lista de Valores Aproximados


# Interpretador de String
def exprInterpreter(expr):
  return parser.expr(expr).compile()


# Metodo da Secante
def secant(f, x0, x1, ERR=0.0001):
  x2 = ((x1 * f(x0))-(x0 * f(x1)))/(f(x0) - f(x1))
  values.append(x2)
  if abs(x2-x1)/abs(x2) < ERR:
    return x2
  else:
    return secant(f, x1, x2, ERR)


# Chutes Iniciais
expr = str(sys.argv[1])
x0 = float(str(sys.argv[2]))
x1 = float(str(sys.argv[3]))
err = float(str(sys.argv[4]))
svdPath = "assets/graphs/" + expr + ".svg"
svdPathZoom = "assets/graphs/" + expr + "(Zoom).svg"


# Definição de que a função é do tipo F(x)
def f(x):
  return(float(eval(exprInterpreter(expr))))


# Aplicação do Metodo da Secante
try:
  res = secant(f, x0, x1, err)
  ids = []
  y_res = f(res)
  y_values = []

  for i in range(len(values)):
    y_values.append(f(values[i]))
    ids.append("x" + str(i+2))

  data['result'].append({
    'ids' : ids,
    'xFinal': res,
    'yFinal': y_res,
    'xValues': values,
    'yValues': y_values,
    'i': len(values)
  })

except (ZeroDivisionError, ValueError, TypeError):
  data['err'].append({
    'secant': 'Expressão Invalida! Valores invalidos.'
  })
except (RecursionError):
  data['err'].append({
    'secant': 'Atenção! Valor maximo de iterações ultrapassado!\n Verifique se o intervalo informado existe.'
  })
except (NameError, SyntaxError):
  data['err'].append({
    'secant': 'Não foi possivel reconhecer elementos da expressão.'
  })
  # print("Expressão Invalida!\n Não foi possivel reconhecer elementos da expressão.\n Ex: sen() == false, sin() == true \n Ex2: a^b == false, a**b == true")


# Plotando o Grafico
# Plotando F(x) (Linha)
try:

  x_any = arange(-50, 50, 0.1)
  y_any = []

  for i in range(len(x_any)):
    y_any.append(f(x_any[i]))

  line = Scatter(
      x = x_any,
      y = y_any,
      mode = 'lines',
      name = expr,
      line = dict(
          width = 2,
          color = '#c15c00'
      )
  )

  # Plotando Melhor X
  bestO = Scatter(
      x = [res,res],
      y = [f(res), f(res)],
      mode = 'markers',
      name = 'Xfinal',
      marker = dict(
          size = 10,
          color = '#fb8a00'
      )
  )

  # Plotando Todos os X

  allO = Scatter(
      x = values,
      y = y_values,
      text = ids,
      mode = 'markers',
      marker = dict(
          size = 10,
          color = '#ffbb45'
      )
  )

  functions = [line, allO, bestO]

  # Layout
  layout = Layout( showlegend = False)

  fig = Figure(data=functions, layout=layout)
  graph = plot(fig, output_type='div')

  # print(str(graph))

  data['graph'].append({
    'html': graph
  })

except(ZeroDivisionError, ValueError, TypeError, SyntaxError, NameError):
  
  try:
    x_any = arange(-50, 50, 0.1)
    y_any = []

    for i in range(len(x_any)):
      y_any.append(f(x_any[i]))

    line = Scatter(
        x = x_any,
        y = y_any,
        mode = 'lines',
        name = expr,
        line = dict(
            width = 2,
            color = '#c15c00'
        )
    )
    
    functions = [line]
    layout = Layout( showlegend = False)
    fig = Figure(data=functions, layout=layout)
    graph = plot(fig, output_type='div')

    data['graph'].append({
      'html': graph
    })
  except(ZeroDivisionError, ValueError, TypeError, SyntaxError, NameError):
    data['err'].append({
        'graph': 'Não foi possivel plotar o grafico para todos os pontos, operação abortada!'
      })
  


data['request'].append({
  'expression': expr,
  'x0': x0,
  'x1': x1,
  'precision': err
})

print(json.dumps(data))
