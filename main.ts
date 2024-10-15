//Pablo Borderas Andrés y Alejandro Molero Ovejero

const handler = (req:Request): Response => {

  const metodo = req.method
  const url = new URL(req.url)
  const path = url.pathname
  const searchparams = url.searchParams

  const developerJokes = [ "¿Por qué los desarrolladores odian la naturaleza? Porque tiene demasiados bugs.", "Un SQL entra en un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme?'", "¡He terminado mi código a tiempo! – Nadie, nunca.", "Si no funciona, añade más console.log().", "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.", "No me asusto fácilmente... excepto cuando veo código sin ; al final.", "Los desarrolladores no envejecen, solo se depuran.", "El único lugar donde puedes escapar de una excepción es en Java.", "Frontend sin diseño es como un backend sin lógica.", "¿Por qué los programadores prefieren el té? Porque en Java no hay café.", "Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.", "Siempre prueba tu código... excepto cuando funciona.", "Tu código no está roto, solo es 'funcionalidad no documentada'.", "En qué se parecen los programadores y los gatos? En que odian mojarse y no pueden dejar de jugar con cosas que no deberían.", "Mi código funciona... hasta que lo toco de nuevo.", "¿Por qué los desarrolladores odian la luz del sol? Porque depuran en la oscuridad.", "Cuando crees que has eliminado todos los bugs, aparece el 'bug final'.", "Git es como un horóscopo: nunca entiendes los conflictos.", "Un desarrollador sin bugs es como un unicornio, no existe.", "En mi máquina funciona... pero no en producción." ];


  if(metodo === "GET"){
    if(path=="/jokes"){
      const numero=url.searchParams.get("numero")
        if(!numero){
        const n=Math.floor(Math.random()*developerJokes.length)
        return new Response(developerJokes[n])
        }
      return new Response(developerJokes.at(parseInt(numero)))
    } else if(path === "/calcular"){
      if(searchparams.get('num1') && searchparams.get('num2')){
        const num1 = searchparams.get('num1')
        if(!num1){
          return new Response("Bad Request",{status:400})
        }
        const num1n = parseInt(num1)
        const num2 = searchparams.get('num2')
        if(!num2){
          return new Response("Bad Request",{status:400})
        }
        const num2n = parseInt(num2)
        switch(searchparams.get('operacion')) { 
          case "suma": { 
             return new Response(JSON.stringify(num1n+num2n)) 
          } 
          case "resta": { 
             return new Response(JSON.stringify(num1n-num2n)) 
          } 
          case "multiplicacion": { 
            return new Response(JSON.stringify(num1n*num2n)) 
          }
          case "division": { 
            return new Response(JSON.stringify(num1n/num2n)) 
         }  
          default: { 
            return new Response("Bad Request",{status:400})
          } 
        }
      }
    } else if(path.startsWith("/reverso/")){
      const ruta = path.split('/') //Con esto separo la ruta por /
      const frase = ruta[ruta.length-1].replaceAll("%20", " ")//De serie me da la ruta, si tiene espacios con %20
      const fraseSeparada = frase.split("")
      const alReves = fraseSeparada.reverse()
      const solucion = alReves.join("")
      if(searchparams.get('detalles')){
        if(searchparams.get('detalles') === "true"){
          return new Response(JSON.stringify({Reverso: solucion , Longitud: solucion.length})) // Esto transforma la rspuesta a un JSON, importante!!!!
        }
      }
      return new Response(JSON.stringify(solucion)) 
      }
      return new Response("Path not found",{status:404})
    }
  return new Response("Method not found",{status:404})

}

Deno.serve({port: 1234},handler)