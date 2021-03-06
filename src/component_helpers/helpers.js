import React from 'react';
import swal from 'sweetalert';
import MenuItem from '@material-ui/core/MenuItem';
import { isArray } from 'util';


// vaildation form email and any other input
export const validate = ({vaildation:{required,email,postiveNumber},value}) => {
    let errorOjbect = {
        message : '',
        vaild : true
    }

    if (email) {
        errorOjbect = (/\S+@\S+\.\S+/.test(value)) ? errorOjbect : {message : 'Not a vaild email', vaild : false }
    }

    if (required) {
        errorOjbect = value ? errorOjbect : {message : 'This field is required', vaild : false }
    } 
    if(postiveNumber) {
        errorOjbect = (/^\+?(0|[1-9]\d*)$/.test(value)) ? errorOjbect : {message : 'Not a vaild number ', valid : false}
        
    }

    return errorOjbect ;
}

export const allFormIsVaild = (formData,dataToSubmit) => {
    let formVaild = true; 
    for (let key in formData) {
        // you have 2 key one form email and one for password
        dataToSubmit[key] = formData[key].value;
        formVaild = formData[key].vaild && formVaild /* the second check to avoid change formVaild to true if the last input is true and the ones before it is false don't */
    }
    return formVaild;

}

export const succesRegister = (message,buttonName) => {

    swal({
        title: "Good job!",
        text: message ,
        icon: "success",
        button: buttonName ? buttonName : false,
      });
    
}


export const failedRegister = (message) => {
    swal(`${message}`)
}


const showGroupValue = (element) => {
    return `${element.day} from ${element.timeStart} to ${element.timeEnd}`;
}


export const renderDropDowns = (arrayOfChoices,isArrayOfObjects,propetyToRender,menuLanguage,multiPropertiesToRender) => {

    // property to render -> time 
    if(isArrayOfObjects)
    {
            return  arrayOfChoices.map((element,index)=>
            
            <MenuItem 
                key={index} 
                value = {!multiPropertiesToRender ? ( isArray(propetyToRender)? element[propetyToRender[1]]: element[propetyToRender]) :element.groupID}
                style = {{
                    display: 'flex',
                    justifyContent: `${menuLanguage === 'en' ? 'flex' : 'flex-end'}`,
                    fontFamily : 'Tajawal , sans-serif',
                    fontWeight : '600',

                }}
            >
                {!multiPropertiesToRender ?  isArray(propetyToRender)? element[propetyToRender[0]]: element[propetyToRender] : showGroupValue(element)} 
            </MenuItem> 
            )  
              
    } else {
        return  arrayOfChoices.map((element,index)=>
            <MenuItem 
                key={index} 
                value = {element}
                style = {{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    fontFamily : 'Tajawal , sans-serif',
                    fontWeight : '600',

                }}
            >
                {element} 
            </MenuItem>
        )
    }
}

export const getGroupsDropArrayByID = (arrayOfGroups,id) => {
    return arrayOfGroups.filter((group) => group.centerID === id )
}

export const toggleDisableEnableButton = (e) => {
    let wantedElement ;
    let id ;
    if(e.target.nodeName === 'BUTTON') {
        wantedElement = e.target.firstChild
        id = e.target.id;
        if(wantedElement.classList.contains('fa-eye')) {
            wantedElement.classList.replace('fa-eye' , 'fa-eye-slash')
            return {statue : 'enable' , id : id}
        }
        else if(wantedElement.classList.contains('fa-eye-slash')) {
            wantedElement.classList.replace('fa-eye-slash' , 'fa-eye')
            return {statue : 'disable' , id : id}
        }
    } else {
       wantedElement = e.target ;
       id = e.target.parentNode.id 
        if(wantedElement.classList.contains('fa-eye')) {
            wantedElement.classList.replace('fa-eye' , 'fa-eye-slash')
            return {statue : 'enable' , id : id}

        }
        else if(wantedElement.classList.contains('fa-eye-slash')) {
            wantedElement.classList.replace('fa-eye-slash' , 'fa-eye')
            return {statue : 'disable' , id : id}
        }
    }
}

export const getIndexForItem  = (id,array,propertyID) => {
    return array.findIndex((element) => {
        return element[propertyID] === id 
    })
}
