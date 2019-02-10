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
    },

    random:()=>{
        return Math.floor(Math.random() * 5 ) + 1;
    },

    publicity: (status) =>{
        let statusIcon, statusTag;
        if(status === 'private'){
            statusIcon = 'fas fa-lock'
            statusTag = 'Private'
        }
        else if(status === 'public'){
            statusIcon = 'fas fa-globe-europe'
            statusTag = 'Public'
        }
        else{
            statusIcon = 'fas fa-user'
            statusTag = 'Only me'
        }
        return [{
            statusIcon,
            statusTag
        }];
    },

    select: (selected, option)=>{
        return option.fn(this).replace( new RegExp(' value=\"'+ selected + '\"'), '$& selected= "selected"').replace( new RegExp('>'+ selected + '</option>'), 'selected="selected"$&');
    }
}