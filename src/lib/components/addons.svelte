<script>
    import {createEventDispatcher} from "svelte";
    import {storedAddons, storedYearly} from '$lib/store.js'

    const dispatch = createEventDispatcher()
    let addons = $storedAddons

    function setPage(page) {
        dispatch('setpage', {
            page: page
        })
    }

    function save() {
        storedAddons.set(addons)
    }

    function toggle(addon) {
        let index = addons.indexOf(addon)

        if (index === -1) {
            addons.push(addon);
            addons = addons;
            return;
        }

        addons.splice(index, 1);
        addons = addons;
    }
</script>

<div class="title">Pick add-ons</div>
<div class="subtitle">Add-ons help enhance your gaming experience.</div>

<div class="addons">
    <a class="addon {addons.includes('multiplayer') ? 'addon-selected' : ''}" href="/" on:click={(e) => {toggle("multiplayer"); e.preventDefault()}}>
        <span class="addon-content">
            <span class="checkbox"><img alt="checkmark" src="/images/icon-checkmark.svg"></span>
            <span>
                <strong>Online service</strong><br>
                <span class="addon-description">Access to multiplayer games</span>
            </span>
        </span>
        <span class="price">
            +{$storedYearly ? "$10/yr" : "$1/mo"}
        </span>
    </a>
    <a class="addon {addons.includes('storage') ? 'addon-selected' : ''}" href="/" on:click={(e) => {toggle("storage"); e.preventDefault()}}>
        <span class="addon-content">
            <span class="checkbox"><img alt="checkmark"  src="/images/icon-checkmark.svg"></span>
            <span>
                <strong>Larger storage</strong><br>
                <span class="addon-description">Extra 1TB of cloud save</span>
            </span>
        </span>
        <span class="price">
            +{$storedYearly ? "$20/yr" : "$2/mo"}
        </span>
    </a>
    <a class="addon {addons.includes('profile') ? 'addon-selected' : ''}" href="/" on:click={(e) => {toggle("profile"); e.preventDefault()}}>
        <span class="addon-content">
            <span class="checkbox"><img alt="checkmark" src="/images/icon-checkmark.svg"></span>
            <span>
                <strong>Customizable profile</strong><br>
                <span class="addon-description">Custom theme on your profile</span>
            </span>
        </span>
        <span class="price">
            +{$storedYearly ? "$20/yr" : "$2/mo"}
        </span>
    </a>
</div>

<span class="links">
    <a href="/static" class="go-back" on:click={(e) => {e.preventDefault(); save(); setPage(2)}}>Go Back</a>
    <a href="/static" class="next-step" on:click={(e) => {e.preventDefault(); save(); setPage(4)}}>Next Step</a>
</span>


<style>
    .addon-content {
        display: flex;
        align-items: center;
        color: hsl(213, 96%, 18%);
    }

    .addon {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 1.3rem;
        border: 1px solid rgba(71, 61, 255, 15%);
        border-radius: 0.5rem;
        box-sizing: border-box;
    }

    .addon-selected {
        border: 1px solid rgba(71, 61, 255);
    }

    .addon-description {
        opacity: 50%;
    }

    .addon:not(:first-child) {
        margin-top: 1rem;
    }

    .addon:not(.addon-selected) .checkbox img {
        visibility: hidden;
    }

    .price {
        display: flex;
        align-items: center;
        color: hsl(243, 100%, 62%);
    }

    .checkbox {
        margin-right: 1rem;
        width: 1rem;
        height: 1rem;
        background-color: white;
        border: 1px solid rgba(71, 61, 255, 15%);
        border-radius: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .addon-selected .checkbox {
        background-color: hsl(243, 100%, 62%);
    }

    .next-step {
        background-color: hsl(213, 96%, 18%);
        font-weight: 700;
        font-size: 0.85rem;
        border-radius: 0.5rem;
        border: 0;
        color: white;
        padding: 1rem;
        float: right;
    }

    .go-back {
        color: hsl(213, 96%, 18%);
        opacity: 50%;
        width: 50%;
    }

    .go-back:hover {
        opacity: 100%;
    }

    .next-step:hover {
        background-color: hsl(212, 94%, 25%);
    }

    .links {
        margin-top: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @media(max-width: 500px) {
        .links {
            margin-top: 0;
        }

        .addon {
            font-size: 12px;
        }
        .go-back {
            position: absolute;
            left: 1rem;
            bottom: 2rem;
        }

        .next-step {
            position: absolute;
            right: 1rem;
            bottom: 1rem;
        }
    }

</style>