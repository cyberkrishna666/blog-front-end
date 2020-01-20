import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSpinner, faHeart } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Aside from './components/aside/Aside'
import Posts from './components/main/Posts'
import Login from './components/aside/Login'
import Signup from './components/main/signup/Signup'
import AddPost from './components/main/AddPost'
import Main from './components/main/Main'
import SinglePost from './components/main/single_post/SinglePost'
import SinglePostHOC from './components/main/single_post/SinglePostHOC'
import PostsFeed from './components/main/feed/PostsFeed'
import MostLikedPosts from './components/main/root_page/most_liked/MostLikedPosts'
import Account from './components/aside/Account'
import { AuthContext, userInitialState, userReducer } from './components/context/userContext'
import { PostsContext, postsInitialState, postsReducer } from './components/context/postsContext'
import ModalWindow from './components/main/modal/ModalWindow'
import SearchResults from './components/main/search/SearchResults'
import PostsByAuthor from './components/main/PostsByAuthor'

library.add(fab, faSpinner, faHeart)

function App() {
  const [ userState, dispatchUser ] = useReducer(userReducer, userInitialState)
  const [ postsState, dispatchPosts ] = useReducer(postsReducer, postsInitialState)
  const [ posts, setPosts ] = useState([])
  const [ showModal, setShowModal ] = useState(false)

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
        <AuthContext.Provider value={{ userState, dispatchUser }}>
          
          { showModal ? <ModalWindow Component={Login} setShowModal={ setShowModal } /> : '' }

        <Header />

        <div className="main_container">
          <PostsContext.Provider value={{ postsState, dispatchPosts }}>
          <Main>
            <Switch>
              <Route exact path="/">
                <MostLikedPosts />
              </Route>

              <Route exact path="/feed/:pageId">
                <PostsFeed Posts={Posts} posts={posts} setPosts={setPosts}/>
              </Route>

              <Route path="/add">
                <AddPost setPosts={setPosts} posts={posts} />
              </Route>

              <Route path="/:author/:postId">
                <SinglePostHOC SinglePost={SinglePost} posts={posts} setPosts={setPosts}/>
              </Route>

              <Route path="/signup/">
                <Signup />
              </Route>

              <Route exact path="/search">
                <SearchResults Posts={Posts} />
              </Route>

              <Route exact path="/:author/">
                <PostsByAuthor Posts={Posts} />
              </Route>

              <Route exact path="/img/" />
              
            </Switch>
          </Main>
          </PostsContext.Provider>

          <Aside side={'right'}>
              <Account setShowModal={setShowModal} />
          </Aside>
        </div>
        </AuthContext.Provider>
      </Router>

        <Footer />
    </div>
  )
}

export default App
