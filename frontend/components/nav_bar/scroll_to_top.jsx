// got this scroll fix form this Stack Overflow answer
// https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition

import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history }) {
  useEffect(() => {
      debugger
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
}

export default withRouter(ScrollToTop);