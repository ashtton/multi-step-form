<script>
    import {createEventDispatcher} from "svelte";
    import { storedYearly, storedPlan, storedAddons } from '$lib/store.js'
    const dispatch = createEventDispatcher()

    class Addon {
        constructor(name, price) {
            this.name = name;
            this.price = price;
        }
    }

    let plans = new Map();
    plans.set("arcade", 9);
    plans.set("advanced", 12);
    plans.set("pro", 15);

    let addons = new Map();
    addons.set("multiplayer", new Addon("Online service", 1));
    addons.set("storage", new Addon("Larger storage", 2));
    addons.set("profile", new Addon("Customizable profile", 2));

    function setPage(page) {
        dispatch('setpage', {
            page: page
        })
    }

    let total = plans.get($storedPlan);
    $storedAddons.forEach(addon => total += addons.get(addon).price)

    if ($storedYearly) {
        total *= 10;
    }

</script>

<div class="title">Finishing up</div>
<div class="subtitle">Double-check everything looks OK before confirming.</div>

<div class="summary">
    <div class="summary-content">
        <span>
            <strong class="capitalize">{$storedPlan} ({$storedYearly ? "Yearly" : "Monthly"})</strong><br>
            <a href="/static" on:click={(e) => {e.preventDefault(); setPage(2)}}><u class="change">Change</u></a>
        </span>
        <span class="summary-price">
            <strong>${$storedYearly ? (plans.get($storedPlan) * 10) + "/yr" : plans.get($storedPlan) + "/mo"}</strong>
        </span>
    </div>
    <hr>

    {#each $storedAddons as addon}
        <div class="addon summary-content">
            <span class="summary-title">
                {addons.get(addon).name}<br>
            </span>
            <span class="summary-price">
                +${$storedYearly ? (addons.get(addon).price * 10) + "/yr" : (addons.get(addon).price) + "/mo"}
            </span>
        </div>
    {/each}

    <div class="summary-content total">
        <span class="summary-title">
            Total (per {$storedYearly ? "year" : "month"})<br>
        </span>
        <span class="summary-price total-price">
            <strong>${total}/{$storedYearly ? "yr" : "mo"}</strong>
        </span>
    </div>
</div>

<div class="links">
    <a href="/static" class="go-back" on:click={(e) => {e.preventDefault(); setPage(3)}}>Go Back</a>
    <a href="/static" class="next-step" on:click={(e) => {e.preventDefault(); setPage(5)}}>Confirm</a>
</div>

<style>
    hr {
        opacity: 2%;
        border-color: hsl(231, 11%, 63%);
    }

    .addon {
        margin-top: 1rem;
    }

    .summary {
        margin-top: 3rem;
        color: hsl(213, 96%, 18%);
        margin-left: 2rem;
        margin-right: 2rem;
    }

    .summary-content {
        display: flex;
        justify-content: space-between;
        opacity: 90%;
        margin-bottom: 1rem;
    }

    .summary-title {
        opacity: 50%;
    }

    .summary-price {
        display: flex;
        align-items: center;
    }

    .total-price {
        font-size: 18px;
        color: hsl(243, 100%, 62%);
    }

    .change {
        opacity: 50%;
        font-size: 14px;
    }

    .total {
        margin-top: 3rem;
    }

    .next-step {
        background-color: hsl(213, 96%, 18%);
        border-radius: 0.5rem;
        border: 0;
        color: white;
        padding: 1rem 1.5rem;
        font-weight: 700;
        float: right;
    }

    .go-back {
        color: hsl(213, 96%, 18%);
        opacity: 50%;
    }

    .go-back:hover {
        opacity: 100%;
    }

    .next-step:hover {
        background-color: hsl(212, 94%, 25%);
    }

    .links {
        margin-top: 8rem;
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