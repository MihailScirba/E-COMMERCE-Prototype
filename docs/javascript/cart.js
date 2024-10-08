let container = document.getElementById('products-container')

let finalSum = 0;
let total = 0;
let delivery = 0;

let receipt = document.createElement('div')
receipt.id = 'receipt'

for (let key in localStorage) {
    if (!isNaN(key)) {
        let product = JSON.parse(localStorage.getItem(key))
        let amount = 1
        let productTotal = product.price.final
        finalSum += product.price.final
        let block = document.createElement('div')
        block.classList.add('block')
        block.innerHTML = `
            <img src="${product.imageCart}">
            <h3>${product.name}</h3>
            <h4>${product.price.final} $</h4>
            <div class="amount-btns"> 
                <button class="decrease">-</button>
                <p class="amount">${amount}</p>
                <button class="increase">+</button>
            </div>
            <h4 class="product-total">${productTotal} $</h4>
            <button class="remove">x</button>
        `
        block.querySelector('.amount-btns .decrease').addEventListener('click', () => {
            if (amount == 1) {
                alert('Amount cannot be less than 1')
            } else {
                amount -= 1
                finalSum -= product.price.final
                productTotal = product.price.final * amount
                block.querySelector('.product-total').innerHTML = productTotal + ' $'
                block.querySelector('.amount').innerHTML = amount
                delivery = parseInt(finalSum * 0.1);
                total = finalSum + delivery
                receipt.innerHTML = `
                    <h3>Subtotal:</h3> <span>${finalSum} $</span>
                    <h3>Delivering:</h3> <span>${delivery} $</span>
                    <h2>Total:</h2> <span>${total} $</span>
                `
            }
        })
        block.querySelector('.amount-btns .increase').addEventListener('click', () => {
            amount += 1
            finalSum += product.price.final
            productTotal = product.price.final * amount
            block.querySelector('.product-total').innerHTML = productTotal + ' $'
            block.querySelector('.amount').innerHTML = amount

            delivery = parseInt(finalSum * 0.1);
            total = finalSum + delivery
            receipt.innerHTML = `
                <h3>Subtotal:</h3> <span>${finalSum} $</span>
                <h3>Delivering:</h3> <span>${delivery} $</span>
                <h2>Total:</h2> <span>${total} $</span>
            `
        })
        block.querySelector('.remove').addEventListener('click', () => {
            localStorage.removeItem(key)
            location.reload()
        })
        container.appendChild(block)
    }
}

delivery = parseInt(finalSum * 0.1);
total = finalSum + delivery
receipt.innerHTML = `
    <h3>Subtotal:</h3> <span>${finalSum} $</span>
    <h3>Delivering:</h3> <span>${delivery} $</span>
    <h2>Total:</h2> <span>${total} $</span>
`
container.appendChild(receipt)

let command = document.createElement('div')
command.id = 'command'
command.innerHTML = `
    <button>Command</button>
`
container.appendChild(command)
command.querySelector('button').addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})
