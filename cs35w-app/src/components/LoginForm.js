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
                        <input type="text" name="username" />
                    </label>
                </div>

                <br />
                <div>
                    <label>
                        Password :
                        <input type="text" name="password" />
                    </label>
                </div>
                <br />
                <div className='action'>
                    <input className='btn' onClick={loginHandler} type="submit" value="Log In" /></div>
            </div>
        </form>
    )
}

export default LogininForm;