const parseErrorMsg = (error: Error) => {
  const regex = /"message":"(.*?)"/;
  const match = regex.exec(error?.message);
  if (match && match?.length > 0) {
    console.log(match[1]);

    return match[1];
  } else {
    return null;
  }
};

const timeToHumanRead = (timestamp: number): string => {
  // Get the current time.
  const now = Date.now();

  // Calculate the difference between the current time and the timestamp.
  const timeDifference = now - timestamp * 1000;

  // Return a human-readable string representing the difference.
  if (timeDifference < 60000) {
    // Less than a minute
    return "Just now";
  } else if (timeDifference < 3600000) {
    // Less than an hour
    const minutes = Math.floor(timeDifference / 60000);
    return `${minutes}m ago`;
  } else if (timeDifference < 86400000) {
    // Less than a day
    const hours = Math.floor(timeDifference / 3600000);
    return `${hours}h ago`;
  } else if (timeDifference < 2592000000) {
    // Less than a month
    const days = Math.floor(timeDifference / 86400000);
    return `${days}d ago`;
  } else if (timeDifference < 31536000000) {
    // Less than a year
    const months = Math.floor(timeDifference / 2592000000);
    return `${months}mo ago`;
  } else {
    // More than a year
    const years = Math.floor(timeDifference / 31536000000);
    return `${years}y ago`;
  }
};

const truncateString = (
  str: string,
  firstPortionLength: number,
  endPortionLength: number,
) => {
  if (str?.length <= firstPortionLength + endPortionLength) return str; //No truncation need

  const firstPortion = str?.slice(0, firstPortionLength) || "";
  const endPortion = str?.slice(-endPortionLength) || "";

  return `${firstPortion}...${endPortion}`;
};

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): T {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  } as T;
}

export { parseErrorMsg, timeToHumanRead, truncateString, debounce };
