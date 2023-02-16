function LogininForm(props) {
    function loginHandler() {
        console.log("clicked");
    }
    return (
        <form>
            <div className='card'>
                <div>
                    <h2>{props.text}</h2>
                    <label>
                        User Name:
                        <input className='actions' type="text" name="username" />
                    </label>
                </div>

                <br />
                <div>
                    <label>
                        Password :
                        <input className='actions' type="text" name="password" />
                    </label>
                </div>
                <br />
                <div className='actions'>
                    <div className='rowC'>
                        <input className='btn' onClick={loginHandler} type="submit" value="Create an Account" />
                        <input className='btn' onClick={loginHandler} type="submit" value="Log In" />
                    </div>
                </div>
            </div>
        </form >
    )
}

export default LogininForm;