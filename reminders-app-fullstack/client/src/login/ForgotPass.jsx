import { Link } from 'react-router-dom';



export default function ForgotPass() {

    return (
        <div className="forgotPassDiv">
            <Link to={"/"} className="forgotPassBackBtn">Back</Link>
            <h4>Forgot Your Password?</h4>
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="textarea1" class="materialize-textarea textareas" />
                            <label for="textarea1">Username</label>
                        </div>
                    </div>
                </form>
            </div>

            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="textarea1" class="materialize-textarea textareas" />
                            <label for="textarea1">What Is Your Mothers Maiden Name?</label>
                        </div>
                    </div>
                </form>
            </div>

            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="textarea1" class="materialize-textarea textareas" />
                            <label for="textarea1">What Is Your Favorite Video Game?</label>
                        </div>
                    </div>
                </form>
            </div>

            <button className="btn light-blue lighten-2 disabled">Recover</button>

        </div>
    )


}