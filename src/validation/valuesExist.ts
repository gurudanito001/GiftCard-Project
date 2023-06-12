
let valuesExist: ( arrayOfRequiredValues: string[], formData: any) => object
valuesExist =  (arrayOfRequiredValues, formData ) => {
  let errors: any = null ;
  
  arrayOfRequiredValues.forEach( value =>{
    if(!Object.keys(formData).includes(value) || formData[value] === undefined){
      errors[value] = `${convertToNormalText(value)} is required`;
    }else if(typeof(formData[value]) === "object"){
      if(formData[value].length === 0){
        errors[value] = `${convertToNormalText(value)} is required`;
      }else if(Object.keys(formData[value]).length === 0){
        errors[value] = `${convertToNormalText(value)} is required`;
      }
    }
  })

  return errors
}

export default valuesExist;


function convertToNormalText (camelCaseText: string){
  return camelCaseText.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}