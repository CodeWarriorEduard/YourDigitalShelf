import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/UseAuth';
import { useEffect, useState } from 'react';


type Variant = "home" | "landing" | "info";



function Header(props: { variant: Variant }) {

    const { logout } = useAuth();
    const [inputVal, setInputVal] = useState<String>();
    const navigate = useNavigate();

    let showBar, showUser, showLandingButtons, showLogo: boolean;

    
    
    switch (props.variant) {
        case "home": 
            showBar = true;
            showUser = true;
            showLandingButtons = false;
            showLogo = true;
            break;

        case "landing":
            showBar = false;
            showUser = false;
            showLandingButtons = true;
            showLogo = false;
            break;
        case "info":
            showBar = true;
            showUser = true;
            showLogo = true;
    }



    const handleSearchBar = (e: React.KeyboardEvent) => {
        if (e.key == 'Enter') {
            navigate(`/search?searchTerm=${inputVal}&page=${1}`) 
            // window.location.reload()        
        }
    }


    return (
        <div className="h-28 flex justify-center">
            <div className='navbar wrapper flex justify-between'>
                <div className={`flex-none ${showLogo ? 'visible' : 'invisible'}`}>
                    <a className="btn btn-ghost" href='/'><img className='h-14 ' src={logo} alt="" /></a>
                </div>
                {
                    showBar &&
                    <div className="flex-1 form-control ">
                        <input type="text" placeholder="Search by book, author, etc..." className="input input-bordered w-8/12 mx-4" onChange={(e) => setInputVal(e.currentTarget.value)} onKeyDown={handleSearchBar} />
                    </div>
                }

                {
                    showUser &&
                    <div className="flex ">
                        <ul className="menu menu-horizontal px-1">
                            <li><a href='/collection?page=1'>Collection</a></li>
                        </ul>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="avatar-user"
                                        src="https://img.freepik.com/vector-premium/icono-perfil-avatar-predeterminado-imagen-usuario-redes-sociales-icono-avatar-gris-silueta-perfil-blanco-ilustracion-vectorial_561158-3408.jpg" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><a>Settings</a></li>
                                <li onClick={logout}><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                }
                {
                    showLandingButtons &&
                    <div className='flex gap-2 items-center justify-center'>
                        <Link to={"/login"}><button>Log in</button></Link>
                        <Link to={"/register"}><button className='btn btn-accent'>Sign Up</button></Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header