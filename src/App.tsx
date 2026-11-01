import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { TreatmentsPage } from '@/pages/TreatmentsPage';
import { TreatmentDetailPage } from '@/pages/TreatmentDetailPage';
import { AboutPage } from '@/pages/AboutPage';
import { TeamPage } from '@/pages/TeamPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { ReviewsPage } from '@/pages/ReviewsPage';
import { ContactPage } from '@/pages/ContactPage';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

// Page wrapper with smooth luxury entrance animation
function PageWrapper({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1"
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <div className="flex min-h-screen flex-col bg-[#F8F5F0] text-[#302820] selection:bg-[#B69A76]/30 selection:text-[#302820]">
            <Header />
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <Switch>
                  <Route path="/">
                    <PageWrapper>
                      <HomePage />
                    </PageWrapper>
                  </Route>

                  <Route path="/about">
                    <PageWrapper>
                      <AboutPage />
                    </PageWrapper>
                  </Route>

                  <Route path="/treatments">
                    <PageWrapper>
                      <TreatmentsPage />
                    </PageWrapper>
                  </Route>

                  <Route path="/treatments/:slug">
                    <PageWrapper>
                      <TreatmentDetailPage />
                    </PageWrapper>
                  </Route>

                  <Route path="/team">
                    <PageWrapper>
                      <TeamPage />
                    </PageWrapper>
                  </Route>

                  <Route path="/gallery">
                    <PageWrapper>
                      <GalleryPage />
                    </PageWrapper>
                  </Route>

                  <Route path="/reviews">
                    <PageWrapper>
                      <ReviewsPage />
                    </PageWrapper>
                  </Route>

                  <Route path="/contact">
                    <PageWrapper>
                      <ContactPage />
                    </PageWrapper>
                  </Route>

                  {/* Legacy Redirects for template safety */}
                  <Route path="/shop">
                    <PageWrapper>
                      <TreatmentsPage />
                    </PageWrapper>
                  </Route>
                  <Route path="/rituals">
                    <PageWrapper>
                      <AboutPage />
                    </PageWrapper>
                  </Route>
                  <Route path="/journal">
                    <PageWrapper>
                      <AboutPage />
                    </PageWrapper>
                  </Route>

                  {/* 404 Route */}
                  <Route>
                    <PageWrapper>
                      <NotFound />
                    </PageWrapper>
                  </Route>
                </Switch>
              </AnimatePresence>
            </main>
            <Footer />
            <Toaster />
          </div>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
