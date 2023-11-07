function adicionaZero(numero) {
    if (numero <= 9)
        return "0" + numero;
    else
        return "" + numero;
}


exports.formatDate = function(date) {

    if (date == null) {
        return null;
    }

    if (typeof(date) === 'string') {
        if (date.length > 10) date = date.substring(0, 10);
        return date;
    } else {
        data = new Date(date);
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }
}




exports.formatDateYYYYMMDD = function(date) {

    if (date == null) {
        return null;
    }
    if (typeof(date) === 'string') {
        if (date.length == 0) {
            return 'null'
        }
        if (date.length > 10) date = date.substring(0, 10);
        date = date.split('/');
        return [date[2], date[1], date[0]].join('-');
    } else {
        return date.yyyymmdd();
    }
}

exports.IfNUllNoAspas = function(date) {

    if (date == 'null') return 'null';

    return `'${date}'`;

}


Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};

exports.formatDateHour = function(date) {

    return date;

}