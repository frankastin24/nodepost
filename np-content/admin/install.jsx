const header = require('header');
const footer = require('footer');
<body>
    
    <header/>

    <div id="install-select-database">

        <h1>{__("Thankyou for choosing NodePost!")}</h1>

        <h2>{__("Let's get started!")}</h2>

        <h3>{__("Which Database would you like to use?")}</h3>

        <p>{"If you are developing a site or your site is going to have a small amount of data with low traffic use SQLite. <br/> If your site is in production mode and a large amount of data or has high traffic use MySQL"}</p>

        <button>SQLite</button>
        <button>MySQL</button>
    
    </div>
    <div id="install-set-db-creds">
        <h1>{__("Please add your MySQL credentials")}</h1>
        <form>
            <label>{__("Hostname")}</label>
            <input name="db_host" value="localhost"/>
            <label>{__("Database Name")}</label>
            <input name="db_name" value=""/>
            <label>{__("Username")}</label>
            <input name="db_name" value=""/>
            <label>{__("Password")}</label>
            <input name="db_name" value=""/>
            <button>{__("Test connection")}</button>
            <button class="next">Next</button>
        </form>
    </div>

    <div id="install-site-name">

        <h1>{__("Please Enter Your Site Name & Tag line")}</h1>
        
        <form>
            <label>Site Name</label>
            <input name="site_name" value=""/>
            <label>Site Name</label>
            <input name="tag_line" value=""/>
            <button class="next">Next</button>
        </form>

    </div>

    <div id="install-site-name">

        <h1>{__("How would you like to begin?")}</h1>

        <button>{__("Create the site with AI")}</button>
        
        <button>{__("Start with the Ignition theme")}</button>
        
        <button>{__("Start with the PageBuilder theme")}</button>

    </div>

    <div id="install-create-account">

        <h1>To use AI features you must login or create an account</h1>
        
        <h2>Create Account</h2>
        
        <form>
            <label>Email address</label>
            <input name="email"/>
            <label>Full Name</label>
            <input name="full name"/>
            <label>Password</label>
            <input type="password"/>
            <label>Mobile Number</label>
        </form>
        
        <h2>Or Login</h2>

        <form>
            <label>Email address</label>
            <input name="email"/>
            <label>Password</label>
            <input type="password"/>
        </form>

    </div>

    <footer/>


</body>