// a lot of this is cribbed from
// https://kinsta.com/blog/web-components/
// and cobbled together from "wisdom".

export class MyButton extends HTMLElement {
    // this forces this.attributeChangeCallback
    // to fire whenever the label attribute changes.
    // this is a standard facility of web components.
    static observedAttributes = ["label"];

    // connectedCallback is also a standard facility
    // of web components. It is called when the 
    // element is actually bound to the DOM
    connectedCallback(){
        this.render();
    }

    // another standard lifecycle facility of 
    // web components. This can be removed,
    // but it gives a good place to e.g. release
    // memory handles
    disconnectedCallback(){

    }

    // yet another standard component facility.
    // for when your component gets... moved...
    // to another DOM.
    // this is completely useless, most likely. Delete it.
    adoptedCallback(){

    }

    // this is an arbitrarily named click
    // callback function. It's bound to the
    // component in this.render()
    someCallback(){
        // this wrapper is weird. It allows 'this' in the example text
        // below to align to what you expect. Otherwise, someCallback
        // would get mapped onto the object that owns the 'onclick'
        // (<button id='myid'> in this case)
        return ()=>{
            console.log(`someCallback called for button with label '${this.label}'`)
        }
    }


    // this simple gets called whenever the 'observedAttributes'
    // change, along with the name of the changed attribute
    // its old value, and its new value
    attributeChangedCallback(name, oldValue, newValue){
        console.log(`Attribute has changed. '${name}' is now: '${newValue}'`);
        // here, we take the name of the attribute and set
        // a corresponding javascript property.

        // in this case, `this.label` will stay in sync
        // with the new passed in newValue.
        this[name] = newValue;
        this.render();
    }

    render(){

        // another option here is to use this.attachShadow()
        // instead of doing this innerHTML stuff. You should read
        // notes on shadow DOMs from https://kinsta.com/blog/web-components/
        this.aValue = "some value";
        this.innerHTML = `<button id='myid'>${this.label}</button>`;
        // this selector is not great form 
        // (you'd probably want to let users set this for instance)
        // but it will work.
        this.querySelector("#myid").onclick = this.someCallback();
    }
}

customElements.define( 'my-button', MyButton );