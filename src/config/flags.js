const flags = {
  chips: { enabled: false },
  licenses: { enabled: false }
};

export const isEnabled = flag => {
  if (flags[flag])
    return flags[flag].enabled;

  throw new Error(`${flag} does not exist.`);
}

export const IfEnabled = ({ flag, children }) => {
  if (isEnabled(flag))
    return children;
  else
    return null;
}
