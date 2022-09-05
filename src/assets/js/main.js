let inputNumber = document.querySelector('#phone-number')
let sendButton = document.querySelector('.form-btn')

function maskNumber() {
   let numberLength = inputNumber.value.length 
   if(numberLength === 0) {
      inputNumber.value += '('
   } else if(numberLength === 3) {
      inputNumber.value += ') '
   } 
   else if(numberLength === 9) {
      inputNumber.value += '-'
   }
}

function validateNumber() {
   sendButton.setAttribute('href', `#`)
   sendButton.setAttribute('target', '')
   const dd = ['1','2','3','4','5','6','7','8','9']
   if (inputNumber.value.length < 14 || dd.indexOf(inputNumber.value[1]) === -1 || dd.indexOf(inputNumber.value[2]) === -1) {
      inputNumber.focus()
      inputNumber.value = ''
      new swal({
         title: "Oops...",
         text: "Número inválido. tente novamente",
         icon: "error",
         color: "#4b4b4b",
         confirmButtonColor: '#AA31E8',
         iconColor: '#FF3F4B',
      })
   } else {
      return formatNumber(inputNumber.value) 
   }
}


function formatNumber(number) {
   const regex = /[(]([0-9]{2})[)][\w\s]([0-9]{4})[-]([0-9]{4,5})/
   const formattedNumber = number.replace(regex, '$1$2$3')
   console.log(formattedNumber)
   console.log(formattedNumber.length)
   return sendMessage(formattedNumber)
}

function sendMessage(formattedNumber) {
   let message = document.querySelector('#message')
   let formatMessage = message.value.toLowerCase().replace(' ', '%20')
   sendButton.setAttribute('href', `https://wa.me/${formattedNumber}/?text=${formatMessage}`)
   sendButton.setAttribute('target', '_blank')
   inputNumber.value = ''
   inputNumber.focus()
   message.value = ''
}

sendButton.addEventListener('click', validateNumber)
inputNumber.addEventListener('keydown', maskNumber)