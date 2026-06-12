# Sistema Interactivo de Simulacion y Analisis FANI

## Desafio Final de Metodos Numericos

**Universidad:** Universidad Mayor de San Andres  
**Materia:** Metodos Numericos  
**Tipo de proyecto:** Pagina web interactiva  
**Tema:** Simulacion y analisis de Fenomenos Aereos No Identificados, conocidos como FANI u OVNIs  
**Tecnologias:** HTML, CSS, JavaScript y Chart.js  
**Estado:** Proyecto funcional, listo para pruebas, exposicion y despliegue web

---

## 1. Descripcion general del proyecto

Este proyecto consiste en una pagina web interactiva orientada al analisis numerico de fenomenos aereos anomalos. La aplicacion permite simular distintos escenarios relacionados con la deteccion, trayectoria, descenso, desplazamiento, equilibrio termico, estabilidad numerica y propagacion social de un avistamiento FANI.

La finalidad principal es demostrar como los metodos numericos pueden utilizarse para resolver problemas aplicados a contextos fisicos y cientificos. Para ello, el sistema integra formularios de entrada, validacion de datos, tablas de iteraciones, resultados numericos, graficas dinamicas e interpretaciones academicas dentro de una sola interfaz web.

El proyecto fue desarrollado tomando como base la consigna del desafio final, donde se solicita una plataforma que aplique algebra lineal, raices de ecuaciones, interpolacion, integracion numerica y ecuaciones diferenciales ordinarias para modelar situaciones de rastreo y analisis de datos FANI.

---

## 2. Objetivo general

Desarrollar una pagina web interactiva que aplique metodos numericos para modelar, resolver y simular situaciones relacionadas con el rastreo, la trayectoria, la cinetica, la estabilidad y el comportamiento de fenomenos aereos anomalos.

---

## 3. Objetivos especificos

- Aplicar sistemas de ecuaciones lineales para calcular la posicion espacial de un objeto detectado por estaciones de radar.
- Implementar metodos de raices para encontrar puntos de equilibrio termico o umbrales criticos.
- Reconstruir trayectorias continuas a partir de datos discretos mediante interpolacion.
- Calcular desplazamientos acumulados usando integracion numerica.
- Resolver ecuaciones diferenciales ordinarias para simular el descenso de un objeto.
- Analizar la estabilidad de sistemas perturbados mediante el numero de condicion.
- Simular un modelo social de alarma colectiva mediante un sistema de ecuaciones diferenciales.
- Mostrar resultados en pantalla mediante tablas, tarjetas informativas y graficas dinamicas.
- Evitar el uso de la consola como medio principal de salida.
- Preparar el proyecto para ser publicado en GitHub Pages o Vercel.

---

## 4. Enfoque del sistema

La aplicacion funciona como un centro de control numerico. Cada modulo representa un escenario matematico distinto y permite al usuario ingresar parametros, ejecutar el metodo correspondiente y observar los resultados.

El sistema no busca afirmar la existencia fisica de un FANI, sino usar ese contexto como situacion de modelado matematico. Por tanto, cada resultado debe interpretarse como una simulacion numerica basada en supuestos, datos de entrada y metodos aproximados.

---

## 5. Tecnologias utilizadas

| Tecnologia | Uso dentro del proyecto |
|---|---|
| HTML5 | Estructura de la pagina y organizacion semantica de los modulos |
| CSS3 | Diseno visual, distribucion responsive, tarjetas, paneles y estilo tematico |
| JavaScript | Logica de los metodos numericos, eventos del DOM, validaciones y calculos |
| Chart.js | Graficas dinamicas de convergencia, trayectorias, descenso y comportamiento social |
| Vercel | Despliegue web gratuito como sitio estatico |
| GitHub | Control de versiones y repositorio publico del proyecto |

---

## 6. Arquitectura del proyecto

El proyecto mantiene una estructura limpia y separada, cumpliendo el formato clasico solicitado para aplicaciones frontend.

```txt
control-fani-numerico/
  index.html
  css/
    estilos.css
  js/
    main.js
    metodos.js
  README.md
  README_COMPLETO.md
  ficha_entrega.txt
  vercel.json
```

### 6.1 Descripcion de archivos

| Archivo | Funcion |
|---|---|
| `index.html` | Contiene la estructura principal de la interfaz, secciones, formularios, botones y contenedores de resultados. |
| `css/estilos.css` | Define el diseno visual, colores, paneles, sidebar, tarjetas, tablas, formularios y adaptacion responsive. |
| `js/main.js` | Controla la interaccion con la interfaz, lectura de datos, eventos de formularios, renderizado de tablas y graficas. |
| `js/metodos.js` | Contiene las funciones matematicas principales: sistemas lineales, raices, interpolacion, integracion, EDO y condicion. |
| `README.md` | Documento resumido del proyecto. |
| `README_COMPLETO.md` | Documento ampliado para entrega, exposicion y repositorio. |
| `ficha_entrega.txt` | Plantilla de entrega con titulo, enlaces y datos del estudiante. |
| `vercel.json` | Configuracion minima para desplegar el proyecto como sitio estatico en Vercel. |

---

## 7. Modulos implementados

La pagina incluye siete modulos principales, cada uno asociado a un escenario del desafio.

---

## 8. Modulo A: Triangulacion de Radar y Localizacion Espacial

### Area matematica

Sistemas de ecuaciones lineales.

### Situacion modelada

Tres estaciones de radar detectan una perturbacion electromagnetica. Cada estacion genera una ecuacion lineal relacionada con las coordenadas espaciales del objeto. El sistema debe calcular la posicion aproximada del FANI en el espacio tridimensional.

### Modelo matematico

El problema se representa como:

```txt
A x = b
```

Donde:

- `A` es la matriz de coeficientes del sistema.
- `x` es el vector de incognitas.
- `b` es el vector de mediciones del radar.

El vector solucion es:

```txt
x = [x, y, z]
```

### Metodos incluidos

- Jacobi
- Gauss-Seidel
- SOR
- Factorizacion LU

### Entradas del usuario

- Matriz `A` de dimension 3 x 3.
- Vector `b` de dimension 3.
- Metodo numerico.
- Tolerancia.
- Factor omega para SOR.

### Salidas en pantalla

- Coordenadas estimadas `x`, `y`, `z`.
- Error aproximado por iteracion.
- Tabla de iteraciones.
- Grafica de convergencia.
- Interpretacion sobre la posicion calculada.

### Importancia academica

Este modulo demuestra como el algebra lineal permite localizar objetos a partir de mediciones indirectas. Tambien permite observar que pequenos cambios en los datos pueden modificar la solucion final.

---

## 9. Modulo B: Simulacion de Descenso Cinematico y Perdida de Altitud

### Area matematica

Ecuaciones diferenciales ordinarias.

### Situacion modelada

Se simula la variacion de la altitud de un FANI durante su descenso hacia la atmosfera. La altura cambia en funcion de una perdida constante y un empuje contrario generado por una supuesta propulsion magnetica.

### Modelo matematico

```txt
dH/dt = Empuje(t) - Atraccion(t)
```

En la implementacion principal se usa el modelo:

```txt
dH/dt = empuje - perdida
```

Donde:

- `H` es la altitud del objeto.
- `t` es el tiempo.
- `empuje` representa la fuerza contraria al descenso.
- `perdida` representa la disminucion de altura por atraccion o consumo de altitud.

### Metodos incluidos

- Euler
- Heun
- Runge-Kutta de cuarto orden

### Entradas del usuario

- Altitud inicial.
- Perdida de altura.
- Empuje contrario.
- Altitud critica.
- Paso de tiempo.
- Metodo numerico.

### Salidas en pantalla

- Tabla de tiempo y altitud.
- Tiempo estimado de llegada a la zona critica.
- Grafica de descenso.
- Interpretacion del comportamiento del objeto.

### Caso obligatorio relacionado

Altitud inicial de 15000 m, perdida de 1500 m/s, empuje contrario de 400 m/s y zona critica en 2000 m.

---

## 10. Modulo C: Reconstruccion de la Ruta de Vuelo

### Area matematica

Interpolacion polinomial.

### Situacion modelada

Un objeto se mueve de forma irregular y solo se tienen mediciones en algunos segundos. El sistema reconstruye una trayectoria continua para estimar la posicion o altitud en un instante no medido.

### Metodo incluido

- Interpolacion de Lagrange

### Modelo matematico

El polinomio interpolante de Lagrange se expresa como:

```txt
P(x) = sumatoria de yi * Li(x)
```

Donde:

```txt
Li(x) = producto de (x - xj) / (xi - xj), con j distinto de i
```

### Entradas del usuario

- Lista de tiempos.
- Lista de alturas o posiciones.
- Tiempo que se desea estimar.

### Salidas en pantalla

- Valor interpolado.
- Puntos originales.
- Curva interpolada.
- Punto estimado marcado en la grafica.
- Interpretacion del resultado.

### Caso obligatorio relacionado

Datos:

| Tiempo | Altitud |
|---:|---:|
| 1 s | 800 m |
| 5 s | 1200 m |
| 10 s | 2500 m |

Calcular la altitud aproximada en el segundo 3.

---

## 11. Modulo D: Calculo del Desplazamiento Total Acumulado

### Area matematica

Integracion numerica.

### Situacion modelada

Se calcula la distancia total recorrida por el fenomeno a partir de una velocidad variable. Matematicamente, la distancia corresponde al area bajo la curva velocidad-tiempo.

### Modelo matematico

```txt
D = integral de v(t) dt
```

Donde:

- `D` es el desplazamiento acumulado.
- `v(t)` es la velocidad en funcion del tiempo.
- `t` es el tiempo de observacion.

### Metodos incluidos

- Regla del trapecio
- Simpson 1/3
- Simpson 3/8

### Entradas del usuario

- Tiempos de medicion.
- Velocidades registradas.
- Metodo numerico.

### Salidas en pantalla

- Distancia total aproximada.
- Comparacion con un modelo lineal.
- Porcentaje de desviacion.
- Grafica de velocidad contra tiempo.
- Interpretacion de posible comportamiento anomalo.

### Importancia academica

Este modulo permite comprender la integracion como acumulacion. En lugar de calcular solo una velocidad puntual, se obtiene una magnitud total a lo largo de un intervalo.

---

## 12. Modulo E: Umbral de Propulsion y Equilibrio Termico

### Area matematica

Raices de ecuaciones no lineales.

### Situacion modelada

Se busca la velocidad o punto de quiebre donde la energia termica emitida por el objeto se equilibra con su sistema de aislamiento. El equilibrio se obtiene cuando la funcion cambia de signo o se aproxima a cero.

### Modelo matematico

```txt
f(v) = energia_emitida(v) - energia_base
```

La raiz se cumple cuando:

```txt
f(v) = 0
```

### Metodos incluidos

- Biseccion
- Newton-Raphson
- Secante

### Entradas del usuario

- Energia base.
- Radiacion objetivo.
- Coeficiente de crecimiento.
- Intervalo inicial o valores iniciales.
- Tolerancia.
- Metodo numerico.

### Salidas en pantalla

- Raiz aproximada.
- Numero de iteraciones.
- Error por iteracion.
- Tabla de iteraciones.
- Grafica de la funcion.
- Marca visual de la raiz.

### Caso obligatorio relacionado

Energia base de 500 unidades y radiacion ascendente a 580 unidades. El sistema debe encontrar el punto donde las fuerzas se neutralizan.

---

## 13. Modulo F: Sistemas Mal Condicionados ante Distorsion Electromagnetica

### Area matematica

Analisis numerico de estabilidad y perturbaciones.

### Situacion modelada

Se analiza que ocurre cuando una pequena perturbacion altera las mediciones del radar. En el desafio se plantea una variacion del vector `b` de 5% para estudiar si la solucion cambia de forma leve o drastica.

### Concepto principal

El numero de condicion mide que tan sensible es un sistema lineal frente a pequenas variaciones en sus datos.

```txt
cond(A) = ||A|| * ||A^-1||
```

### Interpretacion general

| Numero de condicion | Interpretacion |
|---:|---|
| Cercano a 1 | Sistema estable |
| Moderado | Sensibilidad aceptable |
| Muy grande | Sistema mal condicionado |

### Entradas del usuario

- Matriz del radar.
- Vector original.
- Porcentaje de perturbacion.

### Salidas en pantalla

- Numero de condicion.
- Solucion original.
- Solucion perturbada.
- Diferencia entre soluciones.
- Interpretacion de estabilidad.

### Importancia academica

Este modulo es clave porque no basta con resolver un sistema lineal. Tambien se debe analizar si la respuesta obtenida es confiable ante errores de medicion.

---

## 14. Modulo G: Dinamica de Propagacion Social por Avistamiento

### Area matematica

Sistemas de ecuaciones diferenciales ordinarias.

### Situacion modelada

Se simula como una noticia de avistamiento puede propagarse en una poblacion urbana. Se consideran tres grupos:

- `E`: ciudadanos escepticos.
- `A`: ciudadanos alarmados.
- `M`: medios de comunicacion o divulgadores.

### Modelo matematico

```txt
dE/dt = -aEA + bMA
dA/dt = aEA - cAM
dM/dt = kA - rM
```

### Variables y parametros

| Simbolo | Significado |
|---|---|
| `E` | Poblacion esceptica |
| `A` | Poblacion alarmada |
| `M` | Nivel de influencia mediatica |
| `a` | Tasa de contagio de alarma |
| `b` | Recuperacion o retorno al escepticismo |
| `c` | Control informativo |
| `k` | Crecimiento mediatico por alarma |
| `r` | Disipacion de medios |

### Metodo incluido

- Runge-Kutta de cuarto orden vectorizado por componentes

### Salidas en pantalla

- Evolucion temporal de `E`, `A` y `M`.
- Grafica multilinea.
- Interpretacion del efecto del parametro `c`.
- Evaluacion de si la alarma se disipa o se masifica.

---

## 15. Casos de estudio obligatorios

La aplicacion incluye una seccion de pruebas para facilitar la evaluacion. Estos casos permiten cargar datos automaticamente y verificar el funcionamiento de los algoritmos.

### 15.1 Prueba de interpolacion

| Tiempo | Altitud |
|---:|---:|
| 1 s | 800 m |
| 5 s | 1200 m |
| 10 s | 2500 m |

Objetivo:

```txt
Estimar la altitud en t = 3 s
```

### 15.2 Prueba de EDO

| Parametro | Valor |
|---|---:|
| Altitud inicial | 15000 m |
| Perdida de altura | 1500 m/s |
| Empuje contrario | 400 m/s |
| Zona critica | 2000 m |

Objetivo:

```txt
Calcular el tiempo de arribo a la zona critica
```

### 15.3 Prueba de raices

| Parametro | Valor |
|---|---:|
| Energia base | 500 unidades |
| Radiacion | 580 unidades |

Objetivo:

```txt
Encontrar el punto de equilibrio donde f(v) = 0
```

---

## 16. Diseno visual de la pagina

La interfaz fue disenada con una estetica de centro de control cientifico. Se usaron paneles oscuros, tarjetas con bordes suaves, botones destacados, una barra lateral de navegacion y graficas integradas.

### Caracteristicas visuales

- Tema oscuro tecnologico.
- Navegacion lateral por modulos.
- Panel principal con secciones independientes.
- Tarjetas de resultados.
- Tablas de iteraciones.
- Graficas responsivas.
- Botones para ejecutar metodos y cargar pruebas.
- Adaptacion a pantallas pequenas.

---

## 17. Validacion de datos

El sistema valida que los valores ingresados sean numericos y que no generen inconsistencias matematicas graves.

### Validaciones consideradas

- Campos vacios.
- Valores no numericos.
- Tolerancias invalidas.
- Divisiones entre cero en metodos iterativos.
- Intervalos incorrectos para biseccion.
- Cantidad incompatible de datos en interpolacion e integracion.
- Paso de tiempo invalido en EDO.

---

## 18. Uso de graficas

Las graficas permiten interpretar visualmente los resultados obtenidos.

| Modulo | Grafica generada |
|---|---|
| Sistemas lineales | Convergencia del error |
| Raices | Funcion y raiz aproximada |
| Interpolacion | Puntos conocidos y curva estimada |
| Integracion | Curva velocidad-tiempo |
| EDO | Altitud en funcion del tiempo |
| Condicion | Comparacion de solucion original y perturbada |
| Modelo social | Evolucion de E, A y M |

---

## 19. Como ejecutar el proyecto localmente

### Opcion 1: Abrir directamente

Abrir el archivo:

```txt
index.html
```

### Opcion 2: Servidor local con Python

Entrar a la carpeta del proyecto:

```bash
cd control-fani-numerico
```

Ejecutar:

```bash
python -m http.server 8080
```

Abrir en el navegador:

```txt
http://localhost:8080
```

---

## 20. Como subir el proyecto a GitHub

Crear un repositorio nuevo en GitHub y luego ejecutar los siguientes comandos desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "desafio final fani numerico"
git branch -M main
git remote add origin https://github.com/HAjiMe-0/control-fani-numerico
git push -u origin main
```

Reemplazar `USUARIO` por el nombre real de usuario de GitHub.

---

## 21. Como desplegar en Vercel

1. Ingresar a Vercel.
2. Seleccionar `Add New Project`.
3. Importar el repositorio desde GitHub.
4. Dejar la configuracion como proyecto estatico.
5. Confirmar el despliegue.
6. Copiar el enlace final publicado.

El archivo `vercel.json` ayuda a que Vercel sirva correctamente el archivo principal.

---

## 22. Como desplegar en GitHub Pages

1. Subir el proyecto a GitHub.
2. Entrar al repositorio.
3. Ir a `Settings`.
4. Buscar `Pages`.
5. En `Source`, seleccionar la rama `main`.
6. Seleccionar la carpeta raiz.
7. Guardar los cambios.
8. Esperar a que GitHub genere el enlace publico.

---

## 23. Relacion con la rubrica de evaluacion

| Criterio | Como se cumple en el proyecto |
|---|---|
| Modelado de contexto | Cada modulo describe el escenario FANI y sus variables principales. |
| Algebra lineal | Se implementa triangulacion con sistemas 3 x 3 y metodos iterativos/directos. |
| Raices | Se muestran metodos iterativos, tabla y grafica de la funcion. |
| Interpolacion | Se reconstruye una trayectoria mediante Lagrange. |
| Integracion | Se calcula distancia acumulada con reglas numericas. |
| EDO | Se simula el descenso con Euler, Heun y RK4. |
| Interactividad | La pagina usa formularios y botones de ejecucion. |
| Visualizacion | Los resultados se muestran con tablas y Chart.js. |
| Interpretacion critica | Cada modulo presenta una lectura academica del resultado. |
| Diseno responsivo | La interfaz se adapta a computadora y movil. |
| Arquitectura | El codigo esta separado en HTML, CSS y JS. |
| Control de versiones | El proyecto esta listo para repositorio Git. |
| Deploy | Se puede publicar en Vercel o GitHub Pages. |
| Conclusiones | Incluye una seccion final de analisis y limitaciones. |

---

## 24. Limitaciones del proyecto

- Los datos usados son simulados y no provienen de sensores reales.
- Los modelos fisicos fueron simplificados para fines academicos.
- La precision depende de la calidad de los datos ingresados.
- Algunos metodos pueden fallar si se ingresan valores incompatibles.
- La interpretacion de anomalia no representa una conclusion fisica definitiva.
- El sistema no tiene backend ni base de datos, por lo que no almacena historiales.

---

## 25. Autor

```txt
Nombre del estudiante: Harold Ruddy Quispe Hilari
Carrera: Informatica
Materia: Metodos Numericos
Universidad: Universidad Mayor de San Andres
```

---
