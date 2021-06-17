interface ISettingsState {
    allowPrerelease: boolean;
    autoUpdates: boolean;
    bugTracking: boolean;
    email: string;
    firstOpen: boolean;
    language: string;
    lastVersion: string;
    privacyPolicyConsent: boolean;
    token: string;
    usageStatistics: boolean;
}

import defaultSettings from './boot/defaultSettings';

class SettingsStorage {
    constructor() {
        this.settings = defaultSettings;
    }
    public settings: ISettingsState;

    private subscribers: (() => void)[] = [];

    getSettings(): ISettingsState {
        return this.settings;
    }

    setSettings(s: ISettingsState): void {
        this.settings = s;
        this.subscribers.forEach((subscriber) => subscriber());
    }

    subscribe(handler: () => void): void {
        this.subscribers.push(handler);
    }

    unsubscribe(handler: () => void): void {
        const index = this.subscribers.indexOf(handler);
        if (index >= 0) {
            this.subscribers.splice(index, 1);
        }
    }
}

export default new SettingsStorage();
