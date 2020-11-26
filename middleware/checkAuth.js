export default function ({store, redirect}) {
  if (!store.state.authenticate.token) {
    return redirect('/')
  }
}
  