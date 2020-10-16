import React, {useState} from 'react';

const SignIn = ({onRouteChange, setUser}) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChange = e => {
        setEmail(e.target.value);
    }

    const onPasswordChange = e => {
        setPassword(e.target.value);
    }

    const onSubmitSignIn = (e) => {
        e.preventDefault();
        fetch('https://boiling-beyond-21456.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => {
            if (res.status !== 200) {
                return null;
            }
            else {
                return res.json();
            }
        })
        .then(data => {
            if(data) {
                setUser(data);
                onRouteChange('home');
            }
            
        })
    }

    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
        <main className="pa4 black-80">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                    <input onClick={onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                    <p onClick={()=>onRouteChange('register')}href="#0" className="f6 link dim black db pointer">Register</p>
                </div>
            </form>
        </main>
        </article>
    )
}

export default SignIn
