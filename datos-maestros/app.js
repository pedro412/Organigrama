var data = {
  puesto: 'Dirección de Compras',
  colaborador: 'Elsa Rodríguez',
  img: '../datos-maestros/img/elsa-rodriguez.jpg',
  children: [
    {
      puesto: 'Subdirección de Datos Maestros',
      colaborador: 'Irma Palacios',
      img: '../datos-maestros/img/irma-palacios.jpg',
      detalles:
        'Subdireccion de Datos Maestros: Responsable de brindar orientación con el fin de lograr los objetivos del negocio, organizar y administrar los recursos del área, controlar y regular los procesos.',
      children: [
        {
          puesto: 'Gerente de Datos Maestros',
          colaborador: 'Yolanda González',
          img: '../datos-maestros/img/yolanda-gonzalez.jpg',
          detalles:
            'Responsable de coordinar al equipo Comercial, Administrativo y Logístico, realizar evaluaciones, revisiones al correcto cumplimiento de las tareas del equipo a cargo, dar continuidad a los proyectos de negocio con participación de Datos Maestros.',
          children: [
            {
              puesto: 'Jefatura de Datos Maestros',
              colaborador: 'Patricia Gutiérrez',
              img: '../datos-maestros/img/patricia-gutierrez.jpg',
              detalles:
                'Coordinar y administrar la informacion del equipo Comercial (maestro de articulos y precios) y Administrativo (proveedores y organigramas de venta) mediante la revision, registro y actualización de movimientos, garantizando la correcta información en los sistemas.',
              children: [
                {
                  puesto: 'Asesor Comercial',
                  colaborador: 'Jóse Carlos Bermúdez',
                  img: '../datos-maestros/img/jose-carlos-bermudez.jpg',
                  detalles:
                    'Responsable de la operación del  catálogo maestro de artículos.'
                },
                {
                  puesto: 'Analista',
                  colaborador: 'Erika Guadarrama',
                  img: '../datos-maestros/img/erika-guadarrama.jpg',
                  detalles:
                    'Responsable de la operación del  catálogo maestro de proveedores.'
                },
                {
                  puesto: 'Asesor Administrativo',
                  colaborador: 'Noemi Carreño',
                  img: '../datos-maestros/img/noemi-carreño.jpg',
                  detalles:
                    'Responsable de la operación de los catálogos maestros de Farmacias del Dr. Simi, Chile.'
                }
              ]
            },
            {
              puesto: 'Gobierno de Datos Maestros',
              colaborador: 'Javier Baca',
              img: '../datos-maestros/img/javier-baca.jpg',
              detalles:
                'Gobierno de Datos:  Responsable de la actualización a políticas, procedimientos y manuales, revisiones al personal para el  correcto cumplimiento de procesos; primer interacción con TI y nuevos proyectos.'
            },
            {
              puesto: 'Asesor de Datos Maestros Logística',
              colaborador: 'Hugo Sánchez',
              img: '../datos-maestros/img/hugo-sanchez.jpg',
              detalles:
                'Coordinar y administrar la información del equipo Logístico (maestro de  centros/unidades de negocio y maestro clientes), mediante las revisión, registro y actualización de movimientos, garantizando la correcta información en los sistemas.',
              children: [
                {
                  puesto: 'Analista',
                  colaborador: 'Magdalena Gutiérrez',
                  img: '../datos-maestros/img/magdalena-gutierrez.jpg',
                  detalles:
                    'Responsable de los registros en los sistemas en el maestro de clientes.'
                },
                {
                  puesto: 'Analista',
                  colaborador: 'Viridiana Contreras',
                  img: '../datos-maestros/img/viridiana-contreras.jpg',
                  detalles:
                    'Responsable de los registros en los sistemas en el maestro de centros.'
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
var treeLayout = d3.tree().size([2000, 500]);
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
  .attr('transform', 'scale(0.60)translate(-150, 90)')
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
  .attr('width', '240px')
  .attr('height', '50px')
  .attr('x', function(d) {
    return d.x - 120;
  })
  .attr('y', function(d) {
    return d.y - 25;
  })
  .attr('transform', 'scale(0.60)translate(-150, 90)')
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
          return '<div class="colaborador-template"><div><h2 class="modal-header">'
            .concat(colaborador, '</h2><p><strong class="modal-puesto">')
            .concat(
              d.data.puesto,
              '</strong></p></div></div><div class="modal-content">'
            )
            .concat(detalles, '</div>');
        }

        return '<div class="colaborador-template"><img class="img-modal" src="'
          .concat(imgColaborador, '"><div><h2 class="modal-header">')
          .concat(colaborador, '</h2><p><strong class="modal-puesto">')
          .concat(
            d.data.puesto,
            '</strong></p></div></div><div class="modal-content">'
          )
          .concat(detalles, '</div>');
      })
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY - 28 + 'px');
  })
  .on('mouseleave', function() {
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
  .attr('transform', 'scale(0.60)translate(-150, 90)')
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
          return '<div class="colaborador-template"><div><h2 class="modal-header">'
            .concat(colaborador, '</h2><p><strong class="modal-puesto">')
            .concat(
              d.data.puesto,
              '</strong></p></div></div><div class="modal-content">'
            )
            .concat(detalles, '</div>');
        }

        return '<div class="colaborador-template"><img class="img-modal" src="'
          .concat(imgColaborador, '"><div><h2 class="modal-header">')
          .concat(colaborador, '</h2><p><strong class="modal-puesto">')
          .concat(
            d.data.puesto,
            '</strong></p></div></div><div class="modal-content">'
          )
          .concat(detalles, '</div>');
      })
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY - 28 + 'px');
  })
  .on('mouseleave', function() {
    div
      .transition()
      .duration(500)
      .style('opacity', 0);
  })
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
