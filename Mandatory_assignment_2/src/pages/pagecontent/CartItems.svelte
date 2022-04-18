<script>
    import { user, cartList } from "../../components/stores.js";

    let arrayId = 0
    let sumPrices = 0

    function addId(arrayId) {
        return arrayId += 1
    }

    $cartList.forEach(item => {
        item.id = addId(arrayId)
        sumPrices += item.itemPrice
    })
</script>

<div>
    <table>
        <thead>
            <tr>
                {#if $cartList.length != 0} 
                    <th>Item number</th>
                    <th>Item picture</th>
                    <th>Item name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th><button>Check out</button></th>

                {:else}
                    <p>Cart is currently empty. Better get shopping!</p>    
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each $cartList as item}
                <tr>
                    <td>
                        <img src="{item.itemPicture}" alt="itemPicture">
                    </td>
                    <td>
                        {item.itemName}
                    </td>
                    <td>
                        {item.itemDescription}
                    </td>
                    <td>
                        {item.itemPrice}
                    </td>
                </tr>
            {/each}
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    {#if sumPrices != 0}
                        {sumPrices}
                    {/if}
                </td>
            </tr>
        </tbody>
    </table>  
</div>
