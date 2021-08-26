import { GithubRepoFormState } from 'app/containers/GithubRepoForm/types';
import { ContainerState as UpstoxState } from 'app/containers/Upstox/types';
import { ContainerState as AngelState } from 'app/containers/Angel/types';
import { ContainerState as HomeState } from 'app/containers/HomePage/types';
import { ThemeState } from 'styles/theme/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  githubRepoForm?: GithubRepoFormState;
  upstox?: UpstoxState;
  home: HomeState;
  angel: AngelState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
