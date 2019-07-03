var data = {
  puesto: 'Dirección de Compras',
  colaborador: 'Elsa Rodríguez',
  img: '../datos-maestros/img/elsa-rodriguez.jpg',
  children: [
    {
      puesto: 'Subdirección',
      colaborador: 'Irma Palacios',
      img: '../datos-maestros/img/irma-palacios.jpg',
      detalles:
        'Subdireccion de Datos Maestros: Responsable de brindar orientación con el fin de lograr los objetivos del negocio, organizar y administrar los recursos del área, controlar y regular los procesos',
      children: [
        {
          puesto: 'Gobierno Datos',
          colaborador: 'Javier Baca',
          img: '../datos-maestros/img/javier-baca.jpg',
          detalles:
            'Gobierno de Datos:  Responsable de la actualización a políticas, procedimientos y manuales, revisiones al personal para el  correcto cumplimiento de procesos primer interacción con TI y nuevos proyectos.'
        },
        {
          puesto: 'Gerente',
          colaborador: 'Yolanda González',
          img: '../datos-maestros/img/yolanda-gonzalez.jpg',
          detalles:
            'Gerente de Datos Maestros: Responsable de coordinar al equipo a cargo, realizar evaluaciones continuas, dar continuidad a los proyectos de negocio con participacion de  Datos Maestros.',
          children: [
            {
              puesto: 'Jefatura Datos Maestros',
              colaborador: 'Patricia Gutiérrez',
              img: '../datos-maestros/img/patricia-gutierrez.jpg',
              detalles:
                'Jefe de Datos Maestros: Coordinar y administrar la información de los catálogos maestros (productos, proveedores y relacionados) mediante el registro y la actualización de movimientos, garantizando que cuenten con la información correcta en los sistemas periféricos y sistemas satélites, de Farmacias de Similares y Farmacias del Dr. Simi (Chile), con el fin de contribuir en la correcta operación del negocio',
              children: [
                {
                  puesto: 'Asesor Datos Maestros \n Comercial',
                  detalles:
                    'Área Comercial : Responsable del Maestro de Artículos,  Precios (clases de condición y listas inclusión/exclusión) y Promociones (Set de Ventas).',
                  children: [
                    {
                      puesto: 'Analista B',
                      colaborador: 'Jóse Carlos Bermúdez',
                      img: '../datos-maestros/img/jose-carlos-bermudez.jpg'
                    }
                  ]
                },
                {
                  puesto: 'Asesor Datos Maestros \n Administrativo',
                  detalles:
                    'Área Administrativa : Responsable del Maestro de Proveedores,  Clientes Mayoreo y Gestión de catálogos de internacional para Chile  (Artículos, unidades, proveedores y clientes)',
                  children: [
                    {
                      puesto: 'Analista C',
                      colaborador: 'Erika Guadarrama',
                      img: '../datos-maestros/img/erika-guadarrama.jpg'
                    },
                    {
                      puesto: 'Analista C',
                      colaborador: 'Noemi Carreño',
                      img: '../datos-maestros/img/noemi-carreño.jpg'
                    }
                  ]
                }
              ]
            },
            {
              puesto: 'Asesor Datos Maestros \n Logística',
              colaborador: 'Hugo Sánchez',
              img: '../datos-maestros/img/hugo-sanchez.jpg',
              detalles:
                'Área Logística: Responsable del Maestro de centros (unidades de negocio), Maestro clientes franquicias e Interlocutores.',
              children: [
                {
                  puesto: 'Analista C',
                  colaborador: 'Magdalena Gutiérrez',
                  img: '../datos-maestros/img/magdalena-gutierrez.jpg'
                },
                {
                  puesto: 'Analista C',
                  colaborador: 'Viridiana Contreras',
                  img: '../datos-maestros/img/viridiana-contreras.jpg'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

var svg = d3
  .select('.container')
  .append('svg')
  .attr('width', '100%')
  .attr('height', 500);

var transform = d3.zoomIdentity;
var gContainer = svg.append('g');
var dataStructure = d3.hierarchy(data);
var treeLayout = d3.tree().size([1500, 500]);
var information = treeLayout(dataStructure);

var div = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

var connections = gContainer
  .append('g')
  .selectAll('path')
  .data(information.links());

connections
  .enter()
  .append('path')
  .attr('transform', 'translate(-220, 60)')
  .attr('d', function(d) {
    return (
      'M' +
      d.source.x +
      ',' +
      d.source.y +
      ' v 50 H' +
      d.target.x +
      'V' +
      d.target.y
    );
  });

var rectangles = gContainer
  .append('g')
  .selectAll('rect')
  .data(information.descendants());

rectangles
  .enter()
  .append('rect')
  .attr('fill', '#15202b')
  .attr('width', '170px')
  .attr('height', '50px')
  .attr('x', function(d) {
    return d.x - 85;
  })
  .attr('y', function(d) {
    return d.y - 25;
  })
  .attr('transform', 'translate(-220, 60)')
  .on('mouseover', function(d) {
    div
      .transition()
      .duration(200)
      .style('opacity', 1);
    div
      .html(function() {
        var colaborador = d.data.colaborador;
        var imgColaborador = d.data.img;

        var detalles = d.data.detalles;

        if (colaborador == undefined) {
          colaborador = '';
        }

        if (detalles == undefined) {
          detalles = '';
        }

        if (imgColaborador == undefined) {
          return `<div class="colaborador-template">
        <div>
            <h2 class="modal-header">${colaborador}</h2>
            <p><strong class="modal-puesto">${d.data.puesto}</strong></p>
          </div>
        </div>
        <div class="modal-content">
          ${detalles}
        </div>`;
        }

        return `<div class="colaborador-template">
            <img class="img-modal" src="${imgColaborador}">
          <div>
              <h2 class="modal-header">${colaborador}</h2>
              <p><strong class="modal-puesto">${d.data.puesto}</strong></p>
            </div>
          </div>
          <div class="modal-content">
            ${detalles}
          </div>
          `;
      })
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY - 28 + 'px');
    // return d3.select('#details').html(function() {
    //   if (d.data) {
    //     openModal(d);
    //   } else {
    //     d3.select('#details').style('visibility', 'visible');
    //   }
    // });
  })
  .on('mouseleave', function() {
    // d3.select('#details').style('visibility', 'hidden');
    div
      .transition()
      .duration(500)
      .style('opacity', 0);
  });

var names = gContainer
  .append('g')
  .selectAll('text')
  .data(information.descendants());

names
  .enter()
  .append('text')
  .text(function(d) {
    if (d.data.puesto.length > 25) {
      return d.data.puesto.split('\n', 1);
    }
    return d.data.puesto;
  })
  .attr('transform', 'translate(-220, 60)')
  .attr('x', function(d) {
    return d.x;
  })
  .attr('y', function(d) {
    return d.y;
  })
  .classed('name', true);

svg.call(
  d3
    .zoom()
    .scaleExtent([1 / 2, 4])
    .on('zoom', zoomed)
);

function expand(d) {
  if (d._children) {
    d.children = d._children;
    d.children.forEach(expand);
    d._children = null;
  }
}

function zoomed() {
  gContainer.attr('transform', d3.event.transform);
}
