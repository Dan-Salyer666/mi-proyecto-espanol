/* ============================================================
   contenedores-data.js
   Vocabulario de contenedores y recipientes.

   Lo leen DOS páginas:
     topics/contenedores.html        (referencia con láminas)
     interactive/quiz-contenedores.html

   Un solo lugar para corregir una errata.

   Campos:
     lamina     1-9, la lámina a la que pertenece
     id         identificador único (lo usa el quiz)
     x, y       % sobre la imagen: x = centro del objeto,
                y = borde inferior del objeto (ahí cuelga la etiqueta)
     neutral    forma neutra, o null si no existe (=> contested)
     esp/mex/rpl  forma regional; si es igual a neutral, la etiqueta
                no cambia al pulsar esa región
     contested  true  => no hay forma neutra: tres puntos de color
     en         glosa en inglés (para el quiz y la lista)
     nota       una línea, opcional
     trampa     true => aparece también en la tarjeta de falsos amigos
   ============================================================ */

const LAMINAS = [
  { n: 1, slug: 'mesa-y-bebida',              titulo: 'Mesa y bebida',
    sub: 'Lo que se pone en la mesa.' },
  { n: 2, slug: 'infusiones',                 titulo: 'Infusiones y líquido caliente',
    sub: 'El mate, el té y todo lo que calienta el agua.' },
  { n: 3, slug: 'cocina',                     titulo: 'Cocina',
    sub: 'Lo que va al fuego, al horno y a la heladera.' },
  { n: 4, slug: 'envasado-comercial',         titulo: 'Envasado comercial',
    sub: 'Lo que trae el supermercado.' },
  { n: 5, slug: 'carga-y-almacenaje',         titulo: 'Carga y almacenaje',
    sub: 'De la caja de cartón al contenedor marítimo.' },
  { n: 6, slug: 'equipaje-y-viaje',           titulo: 'Equipaje y viaje',
    sub: 'Todo lo que se lleva puesto o en el baúl.' },
  { n: 7, slug: 'objetos-personales',         titulo: 'Objetos personales',
    sub: 'Lo que se lleva encima.' },
  { n: 8, slug: 'hogar-y-residuos',           titulo: 'Hogar y residuos',
    sub: 'Plantas, flores, ropa sucia y basura.' },
  { n: 9, slug: 'lo-valioso-y-lo-definitivo', titulo: 'Lo valioso y lo definitivo',
    sub: 'Lo que se guarda bajo llave y lo que se guarda para siempre.' }
];

const CONTENEDORES = [

  /* ── Lámina 1 — Mesa y bebida ─────────────────────────── */
  { lamina:1, id:'vaso', x:19, y:31,
    neutral:'el vaso', esp:'el vaso', mex:'el vaso', rpl:'el vaso',
    contested:false, en:'drinking glass',
    nota:'Para agua, jugo o un trago. El de vino con pie es «la copa».' },

  { lamina:1, id:'copa', x:50, y:32,
    neutral:'la copa', esp:'la copa', mex:'la copa', rpl:'la copa',
    contested:false, en:'wine glass',
    nota:'Lleva pie. Vino, champán, cócteles.' },

  { lamina:1, id:'taza', x:82, y:29,
    neutral:'la taza', esp:'la taza', mex:'la taza', rpl:'la taza',
    contested:false, en:'cup',
    nota:'Para bebidas calientes: té, café, chocolate.' },

  { lamina:1, id:'bol', x:19, y:61,
    neutral:'el bol', esp:'el cuenco', mex:'el tazón', rpl:'el bol',
    contested:false, en:'bowl',
    nota:'«Tazón» suele ser el grande del desayuno; «bol» se entiende en todas partes.' },

  { lamina:1, id:'jarra', x:51, y:64,
    neutral:'la jarra', esp:'la jarra', mex:'la jarra', rpl:'la jarra',
    contested:false, en:'pitcher, jug',
    nota:'Alta y con pico, para servir.' },

  { lamina:1, id:'jarro', x:83, y:62,
    neutral:'el jarro', esp:'el jarro', mex:'el jarro', rpl:'el jarro',
    contested:false, en:'mug',
    nota:'Rechoncho y para tomar. En el Río de la Plata, el clásico es enlozado.' },

  { lamina:1, id:'bandeja', x:19, y:89,
    neutral:'la bandeja', esp:'la bandeja', mex:'la charola', rpl:'la bandeja',
    contested:false, en:'tray',
    nota:'«Charola» es mexicanismo corriente y no se usa fuera de ahí.' },

  { lamina:1, id:'salero', x:50, y:93,
    neutral:'el salero', esp:'el salero', mex:'el salero', rpl:'el salero',
    contested:false, en:'salt shaker', nota:null },

  { lamina:1, id:'pimentero', x:82, y:93,
    neutral:'el pimentero', esp:'el pimentero', mex:'el pimentero', rpl:'el pimentero',
    contested:false, en:'pepper shaker', nota:null },

  /* ── Lámina 2 — Infusiones ────────────────────────────── */
  { lamina:2, id:'mate', x:17, y:31,
    neutral:'el mate', esp:'el mate', mex:'el mate', rpl:'el mate',
    contested:false, en:'mate gourd',
    nota:'Nombra el recipiente y también la infusión que se toma en él.' },

  { lamina:2, id:'termo', x:51, y:33,
    neutral:'el termo', esp:'el termo', mex:'el termo', rpl:'el termo',
    contested:false, en:'thermos',
    nota:'En el Río de la Plata se lleva bajo el brazo junto con el mate.' },

  { lamina:2, id:'pava', x:82, y:32,
    neutral:null, esp:'el hervidor', mex:'la tetera', rpl:'la pava',
    contested:true, en:'kettle',
    nota:'Sirve para calentar agua. Ojo: no es lo mismo que la tetera de servir.' },

  { lamina:2, id:'tetera', x:17, y:62,
    neutral:'la tetera', esp:'la tetera', mex:'la tetera', rpl:'la tetera',
    contested:false, en:'teapot',
    nota:'Esta es para SERVIR el té ya hecho. Objeto distinto del anterior.' },

  { lamina:2, id:'yerbera', x:50, y:63,
    neutral:'la yerbera', esp:'la yerbera', mex:'la yerbera', rpl:'la yerbera',
    contested:false, en:'yerba mate canister',
    nota:'Objeto rioplatense: no tiene equivalente corriente en España ni en México.' },

  { lamina:2, id:'azucarera', x:17, y:94,
    neutral:'la azucarera', esp:'la azucarera', mex:'el azucarero', rpl:'la azucarera',
    contested:false, en:'sugar bowl', nota:'USO VARIABLE: en México conviven «azucarera» y «azucarero».' },

  { lamina:2, id:'pava-electrica', x:51, y:95,
    neutral:'la pava eléctrica', esp:'el hervidor eléctrico', mex:'la tetera eléctrica', rpl:'la pava eléctrica',
    contested:false, en:'electric kettle',
    nota:'La versión moderna del objeto de arriba, con el mismo reparto regional.' },

  /* ── Lámina 3 — Cocina ────────────────────────────────── */
  { lamina:3, id:'olla', x:16, y:31,
    neutral:'la olla', esp:'la olla', mex:'la olla', rpl:'la olla',
    contested:false, en:'pot, stockpot', nota:'Honda y con dos asas. Para hervir y para guisos.' },

  { lamina:3, id:'cacerola', x:50, y:28,
    neutral:'la cacerola', esp:'la cacerola', mex:'la cacerola', rpl:'la cacerola',
    contested:false, en:'saucepan', nota:null },

  { lamina:3, id:'cazo', x:84, y:28,
    neutral:'el cazo', esp:'el cazo', mex:'el cazo', rpl:'el cazo',
    contested:false, trampa:true, en:'small saucepan',
    nota:'En España, el cacito de un solo mango. En México un «cazo» es el perol hondo de las carnitas.' },

  { lamina:3, id:'sarten', x:17, y:59,
    neutral:'la sartén', esp:'la sartén', mex:'el sartén', rpl:'la sartén',
    contested:false, en:'frying pan',
    nota:'Acá lo que cambia es el GÉNERO, no la palabra: en México, «el sartén».' },

  { lamina:3, id:'asadera', x:50, y:60,
    neutral:null, esp:'la fuente', mex:'el refractario', rpl:'la asadera',
    contested:true, en:'baking dish', nota:'La bandeja honda que va al horno.' },

  { lamina:3, id:'taper', x:83, y:61,
    neutral:'el táper', esp:'el táper', mex:'el táper', rpl:'el tupper',
    contested:false, en:'plastic food container',
    nota:'De «Tupperware». USO VARIABLE: la grafía no está asentada en ningún lado.' },

  { lamina:3, id:'heladera', x:17, y:66, arriba:true,
    neutral:null, esp:'la nevera', mex:'el refrigerador', rpl:'la heladera',
    contested:true, trampa:true, en:'refrigerator',
    nota:'En España también «el frigorífico»; en México, «el refri». Cuidado con «frigorífico» en Argentina.' },

  { lamina:3, id:'panera', x:50, y:94,
    neutral:'la panera', esp:'la panera', mex:'la panera', rpl:'la panera',
    contested:false, en:'bread box', nota:null },

  /* ── Lámina 4 — Envasado comercial ────────────────────── */
  { lamina:4, id:'botella', x:19, y:35,
    neutral:'la botella', esp:'la botella', mex:'la botella', rpl:'la botella',
    contested:false, en:'bottle', nota:null },

  { lamina:4, id:'frasco', x:50, y:32,
    neutral:'el frasco', esp:'el tarro', mex:'el frasco', rpl:'el frasco',
    contested:false, trampa:true, en:'jar',
    nota:'Mermelada, conservas, perfume. En México «el tarro» es el vaso grande de cerveza.' },

  { lamina:4, id:'pote', x:82, y:31,
    neutral:null, esp:'la tarrina', mex:'el bote', rpl:'el pote',
    contested:true, en:'tub (yogurt, ice cream)', nota:null },

  { lamina:4, id:'lata', x:19, y:63,
    neutral:'la lata', esp:'la lata', mex:'la lata', rpl:'la lata',
    contested:false, en:'can, tin', nota:null },

  { lamina:4, id:'carton-leche', x:50, y:66,
    neutral:'el cartón', esp:'el cartón', mex:'el cartón', rpl:'el cartón',
    contested:false, en:'carton', nota:'«Un cartón de leche», «un cartón de jugo».' },

  { lamina:4, id:'sachet', x:82, y:65,
    neutral:'el sachet', esp:'el sachet', mex:'el sachet', rpl:'el sachet',
    contested:false, en:'plastic milk pouch',
    nota:'Objeto rioplatense: la leche en bolsita. Se pronuncia «sashé».' },

  { lamina:4, id:'maple', x:20, y:92,
    neutral:'el cartón de huevos', esp:'el cartón de huevos', mex:'el cartón de huevos', rpl:'el maple',
    contested:false, en:'egg carton', nota:null },

  { lamina:4, id:'tubo', x:50, y:95,
    neutral:'el tubo', esp:'el tubo', mex:'el tubo', rpl:'el tubo',
    contested:false, en:'tube', nota:'Dentífrico, crema, pegamento.' },

  { lamina:4, id:'bidon', x:82, y:96,
    neutral:'el bidón', esp:'el bidón', mex:'el bidón', rpl:'el bidón',
    contested:false, en:'jerrycan', nota:'Rígido, de 5 a 20+ litros: agua, nafta, químicos.' },

  /* ── Lámina 5 — Carga y almacenaje ────────────────────── */
  { lamina:5, id:'caja', x:18, y:32,
    neutral:'la caja', esp:'la caja', mex:'la caja', rpl:'la caja',
    contested:false, en:'box', nota:null },

  { lamina:5, id:'cajon', x:50, y:32,
    neutral:'el cajón', esp:'el cajón', mex:'el cajón', rpl:'el cajón',
    contested:false, trampa:true, en:'crate',
    nota:'También el de un mueble. Y en el Río de la Plata, el ataúd.' },

  { lamina:5, id:'balde', x:82, y:32,
    neutral:null, esp:'el cubo', mex:'la cubeta', rpl:'el balde',
    contested:true, en:'bucket', nota:null },

  { lamina:5, id:'saco', x:19, y:64,
    neutral:null, esp:'el saco', mex:'el costal', rpl:'la bolsa de arpillera',
    contested:true, trampa:true, en:'sack',
    nota:'En México y el Río de la Plata, «un saco» es un saco de vestir.' },

  { lamina:5, id:'barril', x:50, y:64,
    neutral:'el barril', esp:'el barril', mex:'el barril', rpl:'el barril',
    contested:false, en:'barrel', nota:'También «el tonel», sobre todo el grande de vino.' },

  { lamina:5, id:'damajuana', x:82, y:64,
    neutral:'la damajuana', esp:'la damajuana', mex:'la damajuana', rpl:'la damajuana',
    contested:false, en:'demijohn', nota:'El garrafón de vidrio forrado en mimbre.' },

  { lamina:5, id:'caja-herramientas', x:19, y:92,
    neutral:'la caja de herramientas', esp:'la caja de herramientas', mex:'la caja de herramientas', rpl:'la caja de herramientas',
    contested:false, en:'toolbox', nota:null },

  { lamina:5, id:'contenedor', x:50, y:93,
    neutral:'el contenedor', esp:'el contenedor', mex:'el contenedor', rpl:'el contenedor',
    contested:false, en:'shipping container',
    nota:'En España también el de basura que está en la calle.' },

  /* ── Lámina 6 — Equipaje y viaje ──────────────────────── */
  { lamina:6, id:'valija', x:17, y:34,
    neutral:'la maleta', esp:'la maleta', mex:'la maleta', rpl:'la valija',
    contested:false, en:'suitcase', nota:null },

  { lamina:6, id:'maletin', x:50, y:31,
    neutral:'el maletín', esp:'el maletín', mex:'el maletín', rpl:'el maletín',
    contested:false, en:'briefcase', nota:'Documentos, notebook.' },

  { lamina:6, id:'mochila', x:83, y:32,
    neutral:'la mochila', esp:'la mochila', mex:'la mochila', rpl:'la mochila',
    contested:false, en:'backpack', nota:null },

  { lamina:6, id:'bolso-viaje', x:18, y:63,
    neutral:'el bolso de viaje', esp:'el bolso de viaje', mex:'la maleta de mano', rpl:'el bolso de viaje',
    contested:false, en:'duffel bag', nota:null },

  { lamina:6, id:'baul', x:50, y:63,
    neutral:'el baúl', esp:'el baúl', mex:'el baúl', rpl:'el baúl',
    contested:false, en:'trunk, chest', nota:'El mueble antiguo, no el del auto.' },

  { lamina:6, id:'baul-auto', x:83, y:62,
    neutral:null, esp:'el maletero', mex:'la cajuela', rpl:'el baúl',
    contested:true, en:'car trunk, boot', nota:null },

  { lamina:6, id:'vianda', x:17, y:94,
    neutral:null, esp:'la fiambrera', mex:'la lonchera', rpl:'la vianda',
    contested:true, en:'lunchbox', nota:null },

  { lamina:6, id:'cantimplora', x:49, y:96,
    neutral:'la cantimplora', esp:'la cantimplora', mex:'la cantimplora', rpl:'la cantimplora',
    contested:false, en:'canteen', nota:null },

  /* ── Lámina 7 — Objetos personales ────────────────────── */
  { lamina:7, id:'cartera', x:18, y:31,
    neutral:null, esp:'el bolso', mex:'la bolsa', rpl:'la cartera',
    contested:true, trampa:true, en:"woman's handbag",
    nota:'Mirá qué pasa con la billetera de al lado cuando cambiás de región.' },

  { lamina:7, id:'billetera', x:51, y:29,
    neutral:'la billetera', esp:'la cartera', mex:'la cartera', rpl:'la billetera',
    contested:false, trampa:true, en:'wallet',
    nota:'En España y México «la cartera» es ESTA, la de bolsillo.' },

  { lamina:7, id:'bolsa', x:82, y:32,
    neutral:'la bolsa', esp:'la bolsa', mex:'la bolsa', rpl:'la bolsa',
    contested:false, en:'shopping bag', nota:'La de las compras o los mandados.' },

  { lamina:7, id:'estuche', x:18, y:61,
    neutral:'el estuche', esp:'el estuche', mex:'el estuche', rpl:'la cartuchera',
    contested:false, en:'pencil case',
    nota:'«Cartuchera» es la palabra escolar rioplatense. «Estuche» sirve además para anteojos o herramientas.' },

  { lamina:7, id:'neceser', x:50, y:60,
    neutral:'el neceser', esp:'el neceser', mex:'el neceser', rpl:'el neceser',
    contested:false, en:'toiletry bag', nota:null },

  { lamina:7, id:'joyero', x:82, y:61,
    neutral:'el joyero', esp:'el joyero', mex:'el joyero', rpl:'el joyero',
    contested:false, en:'jewellery box', nota:'Para alhajas.' },

  { lamina:7, id:'pastillero', x:18, y:92,
    neutral:'el pastillero', esp:'el pastillero', mex:'el pastillero', rpl:'el pastillero',
    contested:false, en:'pill organiser', nota:null },

  { lamina:7, id:'alcancia', x:50, y:92,
    neutral:null, esp:'la hucha', mex:'la alcancía', rpl:'la alcancía',
    contested:true, en:'piggy bank',
    nota:'«Alcancía» cubre toda América; «hucha» no se usa fuera de España.' },

  { lamina:7, id:'funda', x:82, y:92,
    neutral:'la funda', esp:'la funda', mex:'la funda', rpl:'la funda',
    contested:false, en:'case, sleeve', nota:'De anteojos, de celular, de almohada.' },

  /* ── Lámina 8 — Hogar y residuos ──────────────────────── */
  { lamina:8, id:'tacho', x:18, y:33,
    neutral:null, esp:'el cubo de basura', mex:'el bote de basura', rpl:'el tacho de basura',
    contested:true, trampa:true, en:'trash can',
    nota:'En el Río de la Plata alcanza con «el tacho».' },

  { lamina:8, id:'papelera', x:50, y:32,
    neutral:'la papelera', esp:'la papelera', mex:'el bote de papeles', rpl:'la papelera',
    contested:false, en:'wastepaper basket', nota:'La chica de la oficina o el baño.' },

  { lamina:8, id:'cesto', x:82, y:33,
    neutral:'el cesto', esp:'el cesto', mex:'el cesto', rpl:'el canasto',
    contested:false, en:'hamper',
    nota:'Alto, hondo y sin asas: el de la ropa sucia.' },

  { lamina:8, id:'canasta', x:18, y:64,
    neutral:'la cesta', esp:'la cesta', mex:'la canasta', rpl:'la canasta',
    contested:false, en:'basket',
    nota:'Ancha, baja y con asa: la de las compras o el picnic.' },

  { lamina:8, id:'maceta', x:50, y:66,
    neutral:'la maceta', esp:'la maceta', mex:'la maceta', rpl:'la maceta',
    contested:false, en:'flower pot', nota:'Con tierra y planta viva.' },

  { lamina:8, id:'florero', x:83, y:66,
    neutral:'el florero', esp:'el florero', mex:'el florero', rpl:'el florero',
    contested:false, en:'vase', nota:'Para flores cortadas.' },

  { lamina:8, id:'jarron', x:19, y:96,
    neutral:'el jarrón', esp:'el jarrón', mex:'el jarrón', rpl:'el jarrón',
    contested:false, en:'large decorative vase',
    nota:'Más grande y ornamental que el florero; puede no llevar flores.' },

  { lamina:8, id:'regadera', x:53, y:95,
    neutral:'la regadera', esp:'la regadera', mex:'la regadera', rpl:'la regadera',
    contested:false, trampa:true, en:'watering can',
    nota:'En México «la regadera» es la ducha del baño.' },

  { lamina:8, id:'pecera', x:83, y:95,
    neutral:'la pecera', esp:'la pecera', mex:'la pecera', rpl:'la pecera',
    contested:false, en:'fishbowl', nota:null },

  /* ── Lámina 9 — Lo valioso y lo definitivo ────────────── */
  { lamina:9, id:'caja-fuerte', x:17, y:30,
    neutral:'la caja fuerte', esp:'la caja fuerte', mex:'la caja fuerte', rpl:'la caja fuerte',
    contested:false, en:'safe', nota:null },

  { lamina:9, id:'cofre', x:50, y:29,
    neutral:'el cofre', esp:'el cofre', mex:'el cofre', rpl:'el cofre',
    contested:false, en:'chest, coffer', nota:'Chico y de tapa curva: el del tesoro.' },

  { lamina:9, id:'arcon', x:83, y:29,
    neutral:'el arcón', esp:'el arcón', mex:'el arcón', rpl:'el arcón',
    contested:false, en:'storage chest', nota:'Grande y de tapa plana, para guardar.' },

  { lamina:9, id:'vitrina', x:17, y:64,
    neutral:'la vitrina', esp:'la vitrina', mex:'la vitrina', rpl:'la vitrina',
    contested:false, en:'display cabinet',
    nota:'No confundir con «el escaparate» (Esp), que es la de la calle.' },

  { lamina:9, id:'urna-electoral', x:50, y:62,
    neutral:'la urna', esp:'la urna', mex:'la urna', rpl:'la urna',
    contested:false, en:'ballot box', nota:'«Ir a las urnas» = votar.' },

  { lamina:9, id:'urna-funeraria', x:17, y:94,
    neutral:'la urna', esp:'la urna', mex:'la urna', rpl:'la urna',
    contested:false, en:'funeral urn', nota:'Mismo sustantivo que la electoral, dos usos.' },

  { lamina:9, id:'ataud', x:50, y:94,
    neutral:'el ataúd', esp:'el ataúd', mex:'el ataúd', rpl:'el cajón',
    contested:false, trampa:true, en:'coffin',
    nota:'En México también «la caja». En el Río de la Plata, «el cajón».' }
];

/* Falsos amigos entre regiones — la misma palabra, otra cosa. */
const FALSOS_AMIGOS = [
  { palabra:'el saco',        aca:'la bolsa de arpillera (Esp)', alla:'el saco de vestir (Méx, RPl)' },
  { palabra:'la cartera',     aca:'la billetera de bolsillo (Esp, Méx)', alla:'el bolso de mujer (RPl)' },
  { palabra:'el frigorífico', aca:'la nevera (Esp)', alla:'la planta de faena (RPl)' },
  { palabra:'el cajón',       aca:'el de un mueble, el de fruta', alla:'el ataúd (RPl)' },
  { palabra:'el bote',        aca:'el envase cilíndrico (Esp)', alla:'el de basura (Méx)' },
  { palabra:'la bombilla',    aca:'la de la luz (Esp)', alla:'la del mate (RPl)' },
  { palabra:'la regadera',    aca:'la de las plantas', alla:'la ducha (Méx)' },
  { palabra:'el cazo',        aca:'el cacito de un mango (Esp)', alla:'el perol de las carnitas (Méx)' },
  { palabra:'el tarro',       aca:'el frasco de vidrio (Esp)', alla:'el vaso de cerveza (Méx)' },
  { palabra:'la charola',     aca:'—', alla:'la bandeja (Méx)' }
];

/* Parecidas pero sin parentesco — NO entran al quiz. */
const PARONIMOS = [
  { par:'el bote / la bota', a:'envase cilíndrico', b:'calzado (o el odre de vino)' },
  { par:'el cubo / la cuba', a:'balde',             b:'tonel grande de vino' },
  { par:'el saco / la saca', a:'bolsa grande',      b:'saca postal, jerga del correo' }
];

if (typeof module !== 'undefined') {
  module.exports = { LAMINAS, CONTENEDORES, FALSOS_AMIGOS, PARONIMOS };
}
