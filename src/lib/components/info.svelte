<script>
    import {createEventDispatcher} from "svelte";
    import { storedName, storedPhoneNumber, storedEmail } from '$lib/store.js'

    const dispatch = createEventDispatcher();

    let name = $storedName;
    let email = $storedPhoneNumber;
    let phoneNumber = $storedEmail;

    function error(name) {
        let element = document.getElementById(name + "-error")
        element.removeAttribute("hidden")

        element = document.getElementById(name + "-input")
        element.setAttribute("required", "")
    }

    function removeError(name) {
        let element = document.getElementById(name + "-error")
        element.setAttribute("hidden", "")

        element = document.getElementById(name + "-input")
        element.removeAttribute("required")
    }

    function validate() {
        let err = false;

        if (name === "") {
            error("name");
            err = true;
        }

        if (email === "") {
            error("email");
            err = true;
        }

        if (phoneNumber === "") {
            error("phone");
            err = true;
        }

        if (!err) {
            dispatch('setpage', {
                page: 2
            })

            storedEmail.set(email)
            storedPhoneNumber.set(phoneNumber)
            storedName.set(name)
        }
    }

</script>

<div class="title">Personal info</div>
<div class="subtitle">Please provide your name, email address, and phone number.</div>

<form class="boxes">
    <div class="box">
        <span class="box-info">
            <span class="box-title">Name</span>
            <span id="name-error" hidden class="error">This field is required</span><br>
        </span>
        <input id="name-input" class="box-input" on:input={() => removeError("name")} type="text" bind:value={name} placeholder="e.g. Stephen King">
    </div>
    <div class="box">
        <span class="box-info">
            <span class="box-title">Email Address</span>
            <span id="email-error" hidden class="error">This field is required</span><br>
        </span>
        <input id="email-input" class="box-input" on:input={() => removeError("email")} type="text" bind:value={email} placeholder="e.g. stepenking@lorem.com">
    </div>
    <div class="box">
        <span class="box-info">
            <span class="box-title">Phone Number</span>
            <span id="phone-error" hidden class="error">This field is required</span><br>
        </span>
        <input id="phone-input" class="box-input" on:input={() => removeError("phone")} type="text" bind:value={phoneNumber} placeholder="e.g. +1 234 567 890">
    </div>
</form>

<a href="/static" class="next-step" on:click={(e) => {e.preventDefault(); validate()}}>Next Step</a>

<style>
    .box-title {
        color: hsl(213, 96%, 18%);
        font-size: 0.85rem;
    }

    .box-info {
        display: grid;
        grid-template-columns: 50% 50%;
    }

    .error {
        text-align: right;
        color: hsl(354, 84%, 57%);
        font-size: 14px;
        opacity: 75%;
        font-weight: 700;
    }

    .next-step {
        background-color: hsl(213, 96%, 18%);
        font-weight: 700;
        font-size: 0.85rem;
        border-radius: 0.5rem;
        border: 0;
        color: white;
        padding: 1rem;
        margin-top: 8rem;
        float: right;
    }

    .next-step:hover {
        background-color: hsl(212, 94%, 25%);
    }

    .box-input {
        margin-top: 0.2rem;
        font-weight: 700;
        letter-spacing: 0.03rem;
        box-sizing: border-box;
        color: hsl(213, 96%, 18%);
    }

    .box:not(:first-child) {
        margin-top: 1.2rem;
    }

    input {
        width: 100%;
        border-radius: 0.2rem;
        padding: 0.75rem;
        border: 1px solid hsl(229, 24%, 87%);
    }

    input:required:invalid {
        border-color: hsl(354, 84%, 57%);
    }

    .invalid {
        border: 1px solid hsl(354, 84%, 57%);
    }

    .box-input:focus {
        outline: 1px solid hsl(213, 96%, 18%);
    }

    @media(max-width: 500px) {
        .next-step {
            position: absolute;
            right: 1rem;
        }
    }
</style>