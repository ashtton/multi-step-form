<script>
    import {createEventDispatcher} from "svelte";
    import { storedPlan, storedYearly} from '$lib/store.js'

    const dispatch = createEventDispatcher()

    let yearly = $storedYearly;
    let selected = $storedPlan;

    function setPage(page) {
        dispatch('setpage', {
            page: page
        })
    }

    function save() {
        storedPlan.set(selected);
        storedYearly.set(yearly);
    }
</script>

<div class="title">Select your plan</div>
<div class="subtitle">You have the option of monthly or yearly billing.</div>

<div class="plans">
    <a class="plan {selected === 'arcade' ? 'plan-selected' : ''}" id="arcade" href="/" on:click={(e) => {e.preventDefault();  selected = "arcade"}}>
        <img class="plan-image" src="/images/icon-arcade.svg"><br>
        <span>
            <span class="plan-title"><strong>Arcade</strong></span><br>
            <span class="price">{yearly ? '$90/yr' : '$9/mo'}</span><br>
            <span class="free" hidden="{!yearly ? 'until-found' : ''}">2 months free</span>
        </span>
    </a>
    <a class="plan {selected === 'advanced' ? 'plan-selected' : ''}" id="advanced" href="/" on:click={(e) => {e.preventDefault();  selected = "advanced"}}>
        <img class="plan-image" src="/images/icon-advanced.svg"><br>
        <span>
            <span class="plan-title"><strong>Advanced</strong></span><br>
            <span class="price">{yearly ? '$120/yr' : '$12/mo'}</span><br>
            <span class="free" hidden="{!yearly ? 'until-found' : ''}">2 months free</span>
        </span>
    </a>
    <a class="plan {selected === 'pro' ? 'plan-selected' : ''}" id="pro" href="/" on:click={(e) => {e.preventDefault();  selected = "pro"}}>
        <img class="plan-image" src="/images/icon-pro.svg"><br>
        <span>
            <span class="plan-title"><strong>Pro</strong></span><br>
            <span class="price">{yearly ? '$150/yr' : '$15/mo'}</span><br>
            <span class="free" hidden="{!yearly ? 'until-found' : ''}">2 months free</span>
        </span>
    </a>
</div>

<div class="toggle">
    <span id="monthly" class="toggle-text {yearly ? 'toggle-unselected' : ''}">Monthly</span>

    <label class="switch">
        <input bind:checked={yearly} type="checkbox">
        <span class="slider"></span>
    </label>

    <span id="yearly" class="toggle-text {!yearly ? 'toggle-unselected' : ''}">Yearly</span>
</div>

<br>

<div class="links">
    <a href="/static" class="go-back" on:click={(e) => {e.preventDefault(); save(); setPage(1)}}>Go Back</a>
    <a href="/static" class="next-step" on:click={(e) => {e.preventDefault(); save(); setPage(3)}}>Next Step</a>
</div>

<style>
    .plans {
        display: flex;
        justify-content: center;
    }

    .plan {
        padding: 1rem;
        border: 1px solid rgba(150, 153, 171, 50%);
        border-radius: 0.5rem;
        max-width: 7rem;
        min-width: 7rem;
        color: hsl(213, 96%, 18%);
    }

    .plan-selected {
        border-color: hsl(243, 100%, 62%);
    }

    .plan-title {
    }

    .free {
        font-size: 13px;
    }

    .price {
        opacity: 50%;
        font-size: 14px;
    }

    .plan:not(:first-child) {
        margin-left: 1rem;
    }

    .plan-image {
        margin-bottom: 3.2rem;
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
    }

    .go-back:hover {
        opacity: 100%;
    }

    .next-step:hover {
        background-color: hsl(212, 94%, 25%);
    }

    .toggle {
        margin-top: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .toggle-unselected {
        opacity: 50%;
    }

    .toggle-text {
        color: hsl(213, 96%, 18%);
        font-weight: 700;
        font-size: 14px;
    }

    .links {
        margin-top: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .selected {
        opacity: 100%;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 25px;
        margin-left: 1.2rem;
        margin-right: 1rem;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: hsl(213, 96%, 18%);
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 17px;
        width: 17px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: hsl(213, 96%, 18%);
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }

    @media(max-width: 500px) {
        .plans {
            display: grid
        }
        .plan {
            display: flex;
            max-width: 15rem;
            min-width: 15rem;
            margin-left: 0;
        }

        .plan:not(:first-child) {
            margin-top: 1rem;
            margin-left: unset;
        }

        .plan-image {
            margin: 0 1rem 0 0;
        }
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