import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSpinner, faHeart } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Aside from './components/aside/Aside'
import Posts from './components/main/feed/Posts'
import Signup from './components/main/authentication/Signup'
import AddPost from './components/main/post/AddPost'
import Main from './components/main/Main'
import FullPost from './components/main/post/FullPost'
import FetchFullPost from './components/main/post/FetchFullPost'
import PostsFeed from './components/main/feed/PostsFeed'
import MostLikedPosts from './components/main/root_page/most_liked/MostLikedPosts'
import RecentPosts from './components/main/root_page/recent_posts/RecentPosts'
import MostCommentedPosts from './components/main/root_page/most_commented/MostCommentedPosts'
import Account from './components/aside/Account'
import { AuthContext, userInitialState, userReducer } from './components/context/userContext'
import SearchResults from './components/main/search/SearchResults'
import PostsByAuthor from './components/main/user/PostsByUser'
import UserProfile from './components/main/user/UserProfile'
import { ModalContext, modalReducer, modalInitialState } from './components/context/modalContext'
import PageNotFound from './components/main/PageNotFound'
import ScrollToTop from './components/main/common/ScrollToTop'
import About from './components/main/About'

library.add(fab, faSpinner, faHeart)

function App() {
  const [ modalState, dispatchModal ] = useReducer(modalReducer, modalInitialState)
  const [ userState, dispatchUser ] = useReducer(userReducer, userInitialState)
  const [ posts, setPosts ] = useState([])

  useEffect( () => {
    (async function () {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const loggedUser = await JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'LOGIN', payload: { globalUser: loggedUser }})
    }
   })()
  }, [])


  return (
    <div className="wrapper">
      <Router>
        <ScrollToTop />
        <ModalContext.Provider value={{ modalState, dispatchModal }}>
        <AuthContext.Provider value={{ userState, dispatchUser }}>

        <Header />

        <div className="main_container">
        <Route path={["/feed/:pageId", "/search"]}>
          <Aside side={'right'}>
              <Account />
          </Aside>
          </Route>
          <Main>
            <Switch>
              <Route exact path="/">
                <MostLikedPosts />
                <MostCommentedPosts />
                <RecentPosts />
              </Route>

              <Route exact path="/404" component={PageNotFound} />

              <Route path="/add">
                <AddPost setPosts={setPosts} posts={posts} />
              </Route>

              <Route path="/signup/">
                <Signup />
              </Route>

              <Route path="/about">
                <About />
              </Route>

              <Route exact path="/search">
                <SearchResults Posts={Posts} />
              </Route>

              <Route exact path="/feed/:pageId">
                <PostsFeed Posts={Posts} posts={posts} setPosts={setPosts}/>
              </Route>

              <Route exact path="/:author/">
                <UserProfile />
                <PostsByAuthor Posts={Posts} />
              </Route>

              <Route path="/:author/:postId">
                <FetchFullPost FullPost={FullPost} posts={posts} setPosts={setPosts}/>
              </Route>

            </Switch>
          </Main>
        </div>
        <Footer />
        </AuthContext.Provider>
        </ModalContext.Provider>
      </Router>

    </div>
  )
}

export default App
