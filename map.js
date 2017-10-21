var countriesCommon = ['BY', 'UA', 'RU', 'PL', 'DE', 'BG', 'CZ', 'LT', 'LV', 'EE', 'MD', 'CH', 'FR', 'LI', 'SE']
var countriesUlad = ['GB', 'PT', 'US', 'MX', 'CU']
var countriesMarie = ['IT', 'DK', 'NO']

Highcharts.mapChart('container', {
    chart: {
        spacingBottom: 20
    },
    title: {
        text: ''
    },

    plotOptions: {
        map: {
            allAreas: false,
            joinBy: ['iso-a2', 'code'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                formatter: function () {
                    if (this.point.properties && this.point.properties.labelrank.toString() < 5) {
                        return this.point.properties['iso-a2'];
                    }
                },
                format: null,
                style: {
                    fontWeight: 'bold'
                }
            },
            mapData: Highcharts.maps['custom/world'],
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.name}: <b>{series.name}</b>'
            }
        }
    },

    series: [{
        name: 'common',
        color: '#cc3333',
        data: $.map(countriesCommon, function (code) {
            return { code: code };
        })
    }, {
        name: 'Ulad',
        color: '#4eb3d3',
        data: $.map(countriesUlad, function (code) {
            return { code: code };
        })
    }, {
        name: 'Marie',
        color: '#fed976',
        data: $.map(countriesMarie, function (code) {
            return { code: code };
        })
    }]
});
