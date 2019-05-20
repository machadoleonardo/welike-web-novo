import path2regex from 'path-to-regexp';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

const Status404 = Loadable({
  loader: () => import('../containers/Status404'),
  loading: Loading
});

const Dashboard = Loadable({
  loader: () => import('../../App/Dashboard/Dashboard'),
  loading: Loading,
});

const InfluencerList = Loadable({
  loader: () => import('../../App/Influencer/InfluencerList'),
  loading: Loading,
});

const CampaignList = Loadable({
  loader: () => import('../../App/Campaign/CampaignList'),
  loading: Loading,
});

const CampaignForm = Loadable({
  loader: () => import('../../App/Campaign/CampaignForm'),
  loading: Loading,
});

const ReferenceList = Loadable({
  loader: () => import('../../App/Reference/ReferenceList'),
  loading: Loading,
});

const ReferenceForm = Loadable({
  loader: () => import('../../App/Reference/ReferenceForm'),
  loading: Loading,
});

export const ROUTES = {
  DASHBOARD: {
    path: '/dashboard',
    component: Dashboard,
    exact: true,
  },
  INFLUENCER_LIST: {
    path: '/influencer',
    component: InfluencerList,
    exact: true,
  },
  CAMPAIGN_LIST: {
    path: '/campanha',
    component: CampaignList,
    exact: true,
  },
  CAMPAIGN_FORM: {
    path: '/campanha/form',
    component: CampaignForm,
    exact: true,
  },
  REFERENCE_LIST: {
    path: '/referencia',
    component: ReferenceList,
    exact: true,
  },
  REFERENCE_FORM: {
    path: '/referencia/form',
    component: ReferenceForm,
    exact: true,
  },
  STATUS_404: {
    component: Status404,
  },
};

export const routeToPath = (route, prms) => {
  var toPath = path2regex.compile(route.path);
  return toPath(prms);
}
