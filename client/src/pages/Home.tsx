import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';


const Home = () => {

    return (
        <div className="text-center">
            <div>
                <div className="h-screen w-screen flex justify-center items-center"><img src="kansai.png"></img></div>
                <div className="absolute bottom-0 ">
                    <div className="fixed bottom-16 right-0 py-5 px-0">
                        <img src="trophy.png" width={100} height={100} />
                    </div>
                </div>
                <div className="absolute bottom-0 ">
                    <hr />
                    <br />
                    <div className="flex items-center justify-center w-screen">
                        <a href='/'><HomeIcon fontSize='large' /></a>
                        <MapIcon fontSize='large' className="ml-8" />
                        <EmojiEventsIcon fontSize='large' className="ml-8" />
                        <AccountCircleIcon fontSize='large' className="ml-8" />
                    </div>
                    <br />
                </div>
            </div>
        </div >
    );
};

export default Home;