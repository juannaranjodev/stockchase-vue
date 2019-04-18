import getters from '@/store/getters';

describe('shouldShowAd', () => {
  it('should not be true if user is not loaded', () => {
    const user = {};
    const actual = getters.shouldShowAd({ user });

    expect(actual).not.toBeTruthy();
  });

  it('should be true if user is loaded and ad_free not present', () => {
    const user = { loaded: true };
    const actual = getters.shouldShowAd({ user });

    expect(actual).toBeTruthy();
  });

  it('should not be true if user is ad_free', () => {
    const user = { loaded: true, ad_free: true };
    const actual = getters.shouldShowAd({ user });

    expect(actual).not.toBeTruthy();
  });
});
