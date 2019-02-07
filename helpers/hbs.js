const moment = require('moment');

module.exports = {
    
    truncate: (str, limit)=>{
        if(str.length > limit && str.length > 0){

            let new_str = str + " ";
            new_str = str.substr(0, limit);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = (new_str.length > 0) ? new_str : str.substr(0, limit);
            return new_str + '...'; 
        }

        return str;
    },
    stripTags: (input)=>{
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },
    
    dateFormat: (date, format) =>{

        return moment(date).format(format);
    }
}