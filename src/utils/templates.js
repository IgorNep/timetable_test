/* eslint-disable indent */
const formGroupSelect = (
  contentArr = [],
  labelName = 'label name',
  extraParams = '',
) => {
  const options = contentArr.map(
    (item) => `<option value='${item}'>${item}</option>`,
  );

  return `<div class="form-group">
            <label for="${labelName}">${labelName}: </label>
             <select id="${labelName}" ${extraParams} >
                <option value="" disabled>
                ${
                  extraParams === 'multiple'
                    ? contentArr.join(',')
                    : contentArr[0]
                }
                </option>  
                ${options.join(',')}
             </select> 
           </div>    `;
};

// eslint-disable-next-line import/prefer-default-export
export { formGroupSelect };
