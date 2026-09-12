import { Home as HomeIcon } from 'lucide-react';
import Button from '../components/Button';
import Bottle from '../assets/svg/Bottle';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './NotFound.css';

export default function NotFound() {
  useDocumentTitle('Page Not Found — RIEAL H2O');

  return (
    <section className="notfound">
      <div className="container notfound__inner">
        <div className="notfound__visual" aria-hidden="true">
          <Bottle size={220} />
        </div>
        <div className="notfound__body">
          <span className="eyebrow">404 · Page Not Found</span>
          <h1 className="heading-display">
            This page has evaporated.
          </h1>
          <p>
            The page you're looking for doesn't exist or has moved. Let's get
            you back to purity.
          </p>
          <Button to="/" size="lg">
            <HomeIcon size={16} style={{ marginRight: 4 }} /> Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
