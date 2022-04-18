<script>
    import { user, cartList } from "../../components/stores.js"

    const itemList = [
        {id : 1, itemPicture : "img/itemImg/chair.jpg", itemName : "Dining chair", itemDescription : "Classic furnished dining chair without amrests. Most highly acclaimed for it comfortable design and timeless look.", itemPrice : 300, itemInStore : 14},
        {id : 2, itemPicture : "img/itemImg/table.jpg", itemName : "Dining table", itemDescription : "Antique dining table in lacquered oak. Its solid frame and detailed woodwork creates an atmospheric centerpiece for every dining room. Limited stock.", itemPrice : 1300, itemInStore : 5},
        {id : 3, itemPicture : "img/itemImg/vase.jpg", itemName : "Decorative vase", itemDescription : "Beautiful glaced vase in turquoise Chinese porcelain. Great for flowers, as well as by itself.", itemPrice : 70, itemInStore : 26}
    ]
    function addItem(item) {
        $cartList.push(item)
    }
</script>

<div>
    <table>
        <thead>
            <tr>
                <th>Item picture</th>
                <th>Furniture type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Number available</th>
                <th>🛒</th>
            </tr>
        </thead>
        <tbody>
            {#each itemList as item}
                <tr>
                    <td>
                        <img src="{item.itemPicture}" alt="itemPicture" width="150px" height="200px">
                    </td>
                    <td>
                        {item.itemName}
                    </td>
                    <td>
                        {item.itemDescription}
                    </td>
                    <td>
                        {item.itemPrice + " kr."}
                    </td>
                    <td>
                        {item.itemInStore}
                    </td>
                    <td>
                        <!--{#if $user.userinfo.isLoggedIn}-->
                        <button on:click="{addItem(item)}">Put in cart</button> <!--Add funktion til items, on:click="{addItem(item)}"-->
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>  
</div>

<style>
    div{
        width: 100%;
    }
    table {
        border: 3px solid black;
        text-align: center;
        float: none;
        margin: 0 auto;
        width: 75%;
        border-collapse: collapse;
    }
    td {
        border: 2px solid black;
        padding: 0px;
    }
    tr {
        border: 2px solid black ;
    }
    th {
        padding-left: 25px;
        padding-right: 25px;
    }
    thead {
        background-color: paleturquoise;
    }
</style>