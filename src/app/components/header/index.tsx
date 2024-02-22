import { Button, Tooltip } from 'antd';

import { LoadSettingsToStore, SaveStore } from '../../modules/shared/infrastructure/store';

import { useAppSelector } from '../../modules/shared/app/hooks';
import { RootSelectors } from '../../modules/shared/app/selectors';

import { Route, RouteExtraInfo, RouteLabels } from '../../modules/shared/domain/routes';

import cs from './index.module.css';

export const Header = () => {
  let route = useAppSelector(RootSelectors.route);
  let hasChanges = useAppSelector(RootSelectors.toBeSaved);

  const SaveOrQuit = () => {
    if (hasChanges) {
      SaveStore();
    } else {
      window.backgroundApi.quit();
    }
  };

  return (
    <div className={cs.Header}>
      <div>
        {RouteLabels[route]}{' '}
        {RouteExtraInfo[route] && (
          <Tooltip title={RouteExtraInfo[route]}>
            <span className={cs.info}>🛈</span>
          </Tooltip>
        )}
      </div>
      {route !== Route.INFO && (
        <div>
          <Button
            children="Cancel"
            type="default"
            danger
            disabled={!hasChanges}
            onClick={() => LoadSettingsToStore()}
          />{'  '}
          <Button children={hasChanges ? 'Save' : 'Close'} type="primary" danger={!hasChanges} onClick={SaveOrQuit} />
        </div>
      )}
    </div>
  );
};
