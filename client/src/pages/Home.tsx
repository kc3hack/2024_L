import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HomeIcon from '@mui/icons-material/Home';


const Home = () => {

    return (
        <div className="text-center">
            <div>
                <div className="h-screen w-screen flex justify-center items-center"><img src="https://cdn.discordapp.com/attachments/1160480504898928744/1207607180774088776/image.png?ex=65e042d4&is=65cdcdd4&hm=89549973a289a58df8fada640d0ebe77d202c362c121c5a8eef9c5bfc7c5284e&"></img></div>
                <div className="absolute bottom-0 ">
                    <div className="fixed bottom-16 right-0 py-5 px-0">
                        <img src="https://cdn.discordapp.com/attachments/1160480504898928744/1209303674699124796/image.png?ex=65e66ecf&is=65d3f9cf&hm=634c3b5d22f9b926bc99c81579bd11f98a58a64f483e62f8ede96d6b29fde979&" width={100} height={100} />
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