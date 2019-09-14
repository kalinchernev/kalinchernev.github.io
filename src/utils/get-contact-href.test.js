// @flow strict
import getContactHref from './get-contact-href';

test('getContactHref', () => {
  expect(getContactHref('twitter', '#')).toBe('https://www.twitter.com/#');
  expect(getContactHref('github', '#')).toBe('https://github.com/#');
  expect(getContactHref('email', '#')).toBe('mailto:#');
  expect(getContactHref('vkontakte', '#')).toBe('https://vk.com/#');
  expect(getContactHref('telegram', '#')).toBe('https://t.me/#');
  expect(getContactHref('rss', '#')).toBe('#');
  expect(getContactHref('linkedin', '#')).toBe('https://www.linkedin.com/in/#');
  expect(getContactHref('instagram', '#')).toBe('https://www.instagram.com/#');
  expect(getContactHref('line', '#')).toBe('line://ti/p/#');
  expect(getContactHref('facebook', '#')).toBe('https://www.facebook.com/#');
  expect(getContactHref('gitlab', '#')).toBe('https://www.gitlab.com/#');
  expect(getContactHref('weibo', '#')).toBe('https://www.weibo.com/#');
});
