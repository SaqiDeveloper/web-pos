import {Navigate, Route, Routes} from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//pages
import {Dashboard, Login, Page404, Settings, Users,} from "./pages";
import {UserDetail} from "./pages/users/UserDetail";
import Deposits from "./pages/DepositSection/DepositList";
import PendingWithdraw from "./pages/WithdrawList/PendingList";
import ApproveWithdraw from "./pages/WithdrawList/ApproveList";
import RejectedWithdraw from "./pages/WithdrawList/RejectList";
import {BannerList} from "./pages/BannerSection/BannerList";
import {AddBanner} from "./pages/BannerSection/AddBanner";
import RankListing from "./pages/Ranks/RankListing";
import {AddRank} from "./pages/Ranks/AddRank";
import PromotionListing from "./pages/Promotions/PromotionListing";
import {AddPromotion} from "./pages/Promotions/AddPromotion";
import RejectedDeposits from "./pages/DepositSection/RejectDeposits";
import ApprovedDeposits from "./pages/DepositSection/ApproveDeposit";
import MethodListingSection from "./pages/MethodSection/MethodsListing";
import {EditBanner} from "./pages/BannerSection/EditBanner";
import {AddMethod} from "./pages/MethodSection/AddMethod";
import {EditMethod} from "./pages/MethodSection/EditMethod";
import {UpdateProfile} from "./pages/users/UpdateProfile";
import CommissionLevel from "./pages/LevelCommission/Commission";
import {Businesses} from "./pages/Business/Businesses";

// ----------------------------------------------------------------------

export default function Router() {
  const Authentication = () => {
    if (localStorage.getItem("token")) {
      return <Navigate to="/dashboard"> </Navigate>;
    }
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login"> </Navigate>;
    }
  };
  return (
    <>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user-detail/:id" element={<UserDetail />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/pending-list" element={<Deposits />} />
          <Route path="/rejected-list" element={<RejectedDeposits />} />
          <Route path="/approved-list" element={<ApprovedDeposits />} />
          <Route path="/pending" element={<PendingWithdraw />} />
          <Route path="/approve" element={<ApproveWithdraw />} />
          <Route path="/reject" element={<RejectedWithdraw />} />
          <Route path="/banner-list" element={<BannerList />} />
          <Route path="/add-banner" element={<AddBanner />} />
          <Route path="/edit-banner/:id" element={<EditBanner />} />
          <Route path="/all-ranks" element={<RankListing />} />
          <Route path="/add-rank" element={<AddRank />} />
          <Route path="/edit-rank/:id" element={<AddRank />} />
          <Route path="/promotion-listing" element={<PromotionListing />} />
          <Route path="/add-promotion" element={<AddPromotion />} />
          <Route path="/edit-promotion/:id" element={<AddPromotion />} />
          <Route path="/all-methods" element={<MethodListingSection />} />
          <Route path="/all-methods/add-method" element={<AddMethod />} />
          <Route path="/all-methods/edit-method/:id" element={<EditMethod />} />
          <Route path="/commission-level" element={<CommissionLevel />} />
          <Route path="/business-list" element={<Businesses />} />
        </Route>
        <Route element={<LogoOnlyLayout />}>
          <Route path="/" element={<Authentication />} />
          <Route path="404" element={<Page404 />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </>
  );
}
