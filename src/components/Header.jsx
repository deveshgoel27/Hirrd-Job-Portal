import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react';
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react';
import { useEffect, useState } from 'react';
const Header = () => {

  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  const {user} = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  //  for removing from side when anyone open login modal 
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  }

  return (
    <>
      <nav className='py-4 flex justify-between items-center ml-8 color="#36d7b7" '>
        <Link to="/">
          <img src="/logo.png" alt=' hirrd logo' className="h-20" />
        </Link>

        <div className='flex gap-8'>
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)} className="mr-10 sm:mr-0">
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {/* add a condition here  */}
           { user?.unsafeMetadata?.role === "recruiter" && (
            <Link to="/post-job">
            <Button variant="destructive" className='rounded-full ' >
              <PenBox size={20} className="mr-2" />
              Post a Job
            </Button>
            </Link>
            )}
          
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 mr-7 sm:mr-0",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My-Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href='/my-jobs'
                />
                <UserButton.Link
                  label="saved-Jobs"
                  labelIcon={<Heart size={15} />}
                  href='/saved-jobs'
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>

      </nav>

      {showSignIn &&
        <div className='flex items-center justify-center bg-black/50 fixed inset-0'
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl='/onBoarding'
            fallbackRedirectUrl='/onBoarding'
          />
        </div>}
    </>
  );
};

export default Header;