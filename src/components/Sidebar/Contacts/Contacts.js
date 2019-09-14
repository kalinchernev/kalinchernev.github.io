// @flow strict
import React from 'react';
import { getContactHref, getIcon } from '../../../utils';
import Icon from '../../Icon';
import styles from './Contacts.module.scss';

type Props = {
  contacts: {
    [string]: string,
  },
};

const available = ['twitter', 'linkedin', 'github'];

const Contacts = ({ contacts }: Props) => {
  // Quick way to show only a set of social networks without reworking too much.
  const selected = Object.keys(contacts).filter(a => available.includes(a));

  return (
    <div className={styles['contacts']}>
      <ul className={styles['contacts__list']}>
        {selected.map(name =>
          !contacts[name] ? null : (
            <li className={styles['contacts__list-item']} key={name}>
              <a
                className={styles['contacts__list-item-link']}
                href={getContactHref(name, contacts[name])}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon name={name} icon={getIcon(name)} />
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Contacts;
